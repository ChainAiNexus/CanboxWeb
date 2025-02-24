import { Button } from '@mui/material';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import type { TransactionSignature } from '@solana/web3.js';
import { PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';
import type { FC } from 'react';
import { Buffer } from 'buffer';
import React, { useCallback } from 'react'; 

export const SendTransaction: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet(); 

    const onClick = useCallback(async () => {
        let signature: TransactionSignature | undefined = undefined;
        try {
            if (!publicKey) throw new Error('Wallet not connected!');

            const {
                context: { slot: minContextSlot },
                value: { blockhash, lastValidBlockHeight },
            } = await connection.getLatestBlockhashAndContext();
            
            //   
            // const _greetedPubkey = new PublicKey('BQaUeowGm8u6faVvoyUgAN4JQqu4shDw8SN4ju6Q1bbN')
            // const GREETING_SEED = 'micro_blog';  
            // const greetedPubkey = await PublicKey.createWithSeed(    
            // publicKey,    
            // GREETING_SEED,    
            // _greetedPubkey);
            // debugger

            // let transaction = new Transaction({feePayer: publicKey,recentBlockhash: blockhash,});
            // transaction.add(
            //     new TransactionInstruction({
            //         data: Buffer.from('Hello, from the Solana Wallet Adapter example app!'),
            //         // keys: [],
            //         // 
            //         keys: [{pubkey: greetedPubkey, isSigner: false, isWritable: true}],
            //         programId: _greetedPubkey,
            //     })
            // );
            //   
            const transaction = new Transaction({
                feePayer: publicKey,
                recentBlockhash: blockhash,
            }).add(
                new TransactionInstruction({
                    data: Buffer.from('Hello, from the Solana Wallet Adapter example app!'),
                    keys: [],
                    // 
                    // keys: [{pubkey: greetedPubkey, isSigner: false, isWritable: true}],
                    programId: new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'),
                })
            );

            signature = await sendTransaction(transaction, connection, { minContextSlot });
            // notify('info', 'Transaction sent:', signature);
            console.log( `Transaction sent! ${signature}`);
            debugger

            await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });
            // notify('success', 'Transaction successful!', signature); 
            console.log( `Transaction successful! ${signature}`);
            debugger
        } catch (error: any) {
            console.log( `Transaction failed! ${error?.message}`);
        }
    }, [publicKey, connection, sendTransaction]);

    return (
        <Button variant="contained" color="secondary" onClick={onClick} disabled={!publicKey}>
            Send Transaction (devnet)
        </Button>
    );
};
