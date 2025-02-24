import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { LOCAL_RPC } from '../../config';

const TransferSol = () => {
    window.Buffer = Buffer;
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('');
    const { publicKey } = useWallet();

    //  Solana Devnet
    const connection = new Connection(LOCAL_RPC);

    // 
    const handleTransfer = async () => {
        if (!publicKey) {
            return;
        }
        try {
            setStatus('...');

            // 1. 
            const senderPublicKey = window.solana.publicKey;

            // 2. 
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: senderPublicKey,
                    toPubkey: new PublicKey(recipient),
                    lamports: Math.floor(parseFloat(amount) * 1e9), //  lamports
                })
            );
            let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
            transaction.feePayer = publicKey;
            transaction.recentBlockhash = blockhash;

            // 3. 
            const { signature } = await window.solana.signAndSendTransaction(transaction);
            await connection.confirmTransaction(signature, 'singleGossip');

            setStatus(`！: ${signature}`);
        } catch (error: any) {
            console.error(':', error);
            setStatus(': ' + error.message);
        }
    };

    return (
        <div>
            <h2 style={{ color: '#fff' }}> SOL</h2>
            <div>
                <label style={{ color: '#fff' }}>：</label>
                <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder=""
                />
            </div>
            <div>
                <label style={{ color: '#fff' }}> (SOL)：</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder=""
                />
            </div>
            <button onClick={handleTransfer}></button>
            <p style={{ color: '#fff' }}>{status}</p>
        </div>
    );
};

export default TransferSol;
