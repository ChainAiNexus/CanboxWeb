// import { AnchorProvider, BN, Program } from '@coral-xyz/anchor';
import {
  createTransferInstruction,
  getOrCreateAssociatedTokenAccount,
  TOKEN_PROGRAM_ID as TOKEN_PROGRAM_IDs,
} from '@solana/spl-token';
import { ComputeBudgetProgram, PublicKey, Transaction } from '@solana/web3.js';
import { Buffer } from 'buffer';

import { AnchorProvider, setProvider } from '@coral-xyz/anchor';
import { TOKEN_PROGRAM_ID } from '../../config';

const geMint = async (
  publicKey: any,
  SuccessColl: any,
  connection: any,
  wallet: any,
  payNum: any,
  recipientAdd: any,
  FailedColl: any
) => {
  window.Buffer = Buffer;
  const mintAddress = new PublicKey(TOKEN_PROGRAM_ID);
  const recipientPublicKey = new PublicKey(recipientAdd); //u
  const fromTokenAccount = await getOrCreateAssociatedTokenAccount(connection, publicKey, mintAddress, publicKey);
  console.log(fromTokenAccount.address.toBase58());
  const toTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    publicKey,
    mintAddress,
    recipientPublicKey
  );
  console.log(toTokenAccount.address.toBase58());

  const provider = new AnchorProvider(connection, wallet, {});
  setProvider(provider);

  let tx: any;
  try {
    tx = new Transaction();

    const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
      units: 1400000,
    });
    const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
      microLamports: 200000,
    });
    tx.add(modifyComputeUnits);
    tx.add(addPriorityFee);

    tx.add(
      createTransferInstruction(
        fromTokenAccount.address,
        toTokenAccount.address,
        publicKey,
        payNum * Math.pow(10, 6),
        [],
        TOKEN_PROGRAM_IDs
      )
    );

    let blockhash = (await connection.getLatestBlockhash()).blockhash;
    tx.recentBlockhash = blockhash;
    tx.feePayer = publicKey;
    tx = await wallet?.signTransaction(tx);

    /*
：finalized/、confirmed/、processed/（）
， confirmed，
*/
    const transactionSignature = await provider.connection.sendRawTransaction(tx.serialize(), {
      preflightCommitment: 'finalized',
      skipPreflight: true,
    });
    console.log('tx:' + transactionSignature);
    const serializedTx = tx.serialize();
    console.log(serializedTx.toString('base64'));

    // ：，3
    let Result: any;
    let successed: boolean = false;
    let cout: number = 0;
    let latestBlockhash = await connection.getLatestBlockhash();
    console.log(latestBlockhash.blockhash);
    console.log(latestBlockhash.lastValidBlockHeight);
    console.log('latestBlockhash:' + latestBlockhash);
    while (!successed && cout < 6) {
      cout++;
      Result = await provider.connection.confirmTransaction(
        {
          signature: transactionSignature,
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        },
        'processed'
      );
      console.log('Result:');
      console.log(Result);
      if (Result?.value?.err === null) {
        successed = true;
        break;
      } else {
        latestBlockhash = await connection.getLatestBlockhash();
        continue;
      }
    }
    if (successed) {
      SuccessColl(transactionSignature);
      console.log('Transaction successed');
    } else {
      FailedColl();
      console.log('Transaction FailedColl');
    }
  } catch (error: any) {
    console.log(error);

    FailedColl(error);
  }
};
export default geMint;
