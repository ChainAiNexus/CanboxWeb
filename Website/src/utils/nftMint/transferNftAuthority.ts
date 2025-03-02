import { PublicKey, ComputeBudgetProgram, Transaction, Connection } from '@solana/web3.js';
import { Buffer } from 'buffer';
import idlJson from '../../idl/idl13.json';

import { Program, Idl, AnchorProvider, setProvider, BN } from '@coral-xyz/anchor';
import { notification } from 'antd';

import { LOCAL_programId, LOCAL_RPC } from '../../config';

// ：idNft、mintKey
const geMint = async (
    publicKey: any,
    connection: any,
    wallet: any,
    NftSuccessColl: Function,
    idNft?: any,
    mintKey?: any
) => {
    window.Buffer = Buffer;

    const metadataProgram: any = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
    const TokenProgram: any = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
    const systemProgram: any = new PublicKey('11111111111111111111111111111111');
    const rent: any = new PublicKey('SysvarRent111111111111111111111111111111111');

    const programId = new PublicKey(LOCAL_programId);
    const _connection = new Connection(LOCAL_RPC);

    const _idNft: any = new BN(idNft);
    const _mintKey: any = new PublicKey(mintKey);

    let nftMetadata: any = PublicKey.findProgramAddressSync(
        [Buffer.from('metadata'), metadataProgram.toBuffer(), _mintKey.toBuffer()],
        metadataProgram
    )[0];

    const provider = new AnchorProvider(_connection, wallet, {});
    setProvider(provider);

    const idl: Idl = idlJson as unknown as Idl;
    const program = new Program(idl, programId, provider);

    let transactionSignature = '';
    try {
        let tx = new Transaction();

        const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
            units: 400000,
        });
        const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
            microLamports: 20000,
        });
        tx.add(modifyComputeUnits);
        tx.add(addPriorityFee);
        tx.add(
            await program.methods
                .transferNftAuthority(_idNft)
                .accounts({
                    authority: publicKey,
                    payer: publicKey,
                    rent: rent,
                    systemProgram: systemProgram,
                    tokenProgram: TokenProgram,
                    metadataProgram: metadataProgram,
                    nftMetadata: nftMetadata,
                })
                .signers([publicKey])
                .transaction()
        );

        let blockhash = (await _connection.getLatestBlockhash('finalized')).blockhash;
        tx.recentBlockhash = blockhash;
        tx.feePayer = publicKey;
        tx = await wallet?.signTransaction(tx);

        /*
          ：finalized/、confirmed/、processed/（）
          ， confirmed，
        */
        transactionSignature = await provider.connection.sendRawTransaction(tx.serialize(), {
            preflightCommitment: 'finalized',
            skipPreflight: true,
        });
        console.log('tx:', transactionSignature);

        // NftSuccessColl(transactionSignature, 0);

        // ：，3
        let latestBlockhash = await _connection.getLatestBlockhash();
        let Result: any;
        let successed: boolean = false;
        let cout: number = 0;
        while (!successed && cout < 3) {
            cout++;
            Result = await provider.connection.confirmTransaction(
                {
                    signature: transactionSignature,
                    blockhash: latestBlockhash.blockhash,
                    lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
                },
                'processed'
            );
            if (Result?.value?.err === null) {
                successed = true;
                break;
            } else {
                latestBlockhash = await connection.getLatestBlockhash();
                continue;
            }
        }
        if (successed) {
            NftSuccessColl(transactionSignature, 1);
        } else {
            notification.open({
                message: Result?.value?.err || 'Transaction error',
            });
            NftSuccessColl(transactionSignature, 2);
        }

        // （）
        // const transactionStatus = await provider.connection.getTransaction(transactionSignature);
        // if (transactionStatus) {
        //     console.log('Transaction status:', transactionStatus);
        // } else {
        //     console.error('Transaction not found or still pending.');
        // }

        console.log(tx);
    } catch (error: any) {
        notification.open({
            message: error?.message || error?.name || 'Transaction error',
        });
        console.log(error);
        NftSuccessColl(transactionSignature, 2);
    }
};
export default geMint;
