import { PublicKey, ComputeBudgetProgram, Transaction, Connection } from '@solana/web3.js';
import { Buffer } from 'buffer';
import idlJson from '../../idl/idl_ido.json';

import { Program, Idl, AnchorProvider, setProvider, BN } from '@coral-xyz/anchor';
import { notification } from 'antd';

import { LOCAL_programId, LOCAL_RPC, usdt_receiver1, usdt_receiver2 } from '../../config';
import { addMessage } from '../tool';

const geMint = async (
    publicKey: any,
    connection: any,
    wallet: any,
    NftSuccessColl: Function,
    buyNumber: any,
    CatchColl: Function
) => {
    window.Buffer = Buffer;
    const systemProgram: any = new PublicKey('11111111111111111111111111111111');

    const programId = new PublicKey(LOCAL_programId); // programId

    const _connection = new Connection(LOCAL_RPC);

    let donor: any = PublicKey.findProgramAddressSync([Buffer.from('donor'), publicKey.toBuffer()], programId)[0];

    const provider = new AnchorProvider(_connection, wallet, {});
    setProvider(provider);

    const idl: Idl = idlJson as unknown as Idl;
    const program = new Program(idl, programId, provider);

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
        const _buyNumber = buyNumber * 1000000000;

        tx.add(
            await program.methods
                .donate(new BN(_buyNumber))
                .accounts({
                    donorAccount: publicKey,
                    donor: donor,
                    recipient1: usdt_receiver1,
                    recipient2: usdt_receiver2,
                    systemProgram: systemProgram,
                })
                .signers([publicKey])
                .transaction()
        );

        let blockhash = (await _connection.getLatestBlockhash('processed')).blockhash;
        tx.recentBlockhash = blockhash;
        tx.feePayer = publicKey;
        tx = await wallet?.signTransaction(tx);
        /*
          ：finalized/、confirmed/、processed/（）
          ， confirmed，
        */
        const transactionSignature = await provider.connection.sendRawTransaction(tx.serialize(), {
            preflightCommitment: 'processed',
            skipPreflight: true,
        });
        console.log('tx:', transactionSignature);

        // 
        const latestBlockhash = await _connection.getLatestBlockhash();
        await provider.connection.confirmTransaction(
            {
                signature: transactionSignature,
                blockhash: latestBlockhash.blockhash,
                lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
            },
            'finalized'
        );

        NftSuccessColl();
        console.log(tx);
    } catch (error: any) {
        console.log(error);
        CatchColl(error?.message);

        // addMessage(error?.message || error?.name || 'RPC request timeout, try again later');
    }
};
export default geMint;
