# alchemy-ethereum-bootcamp

The full directory was too large for Github to upload, so I just added the key files. I hope that's ok.

Problem Statement
There are two primary ways businesses enter into commercial contract :
- With Negotiated and signed agreements
	- Much of the negotiating is done through redlining the agreement: 
		- One party provides their agreement template in a Word document, the other party marks it up with the changes they'd like, and sends it  to the first party.
		- The first party reviews it, creates their own redline of the document, and sends that document to the other party
		- The process continues...back and forth, and the parties may also try to work out the details on calls
	- Once an agreement has been reached, the document needs to routed through an e-sign platform, and the authorized signers on both sides have to sign
	- The drawbacks are that
		- It's lengthy and labor intensive... 
			- Even if there's only one round of redlines, the process still involves a lot of steps
		- Also...the Parties often use inefficient negotiation tactics, like starting high or ask for more than they actually want so they can offer fake "concessions" later
- On the other end of the spectrum are standard, non negotiable terms of service that are accepted by clicking a button, checking a box, or even just using a service
	- The issues here are:
		- Sellers usually reserve the right to unilaterally modify the terms
		- Companies really don't have a good way to prevent employees from accepting T&Cs 
		- You can't really be certain which terms have been agreed to on behalf of the company, since there's no record (like a signed document)
	- All of these are particularly problematic when the terms govern a third party tool that you're using in your own product

Solution
My solution overcomes these problems by relying on some key features of the blockchain:
- Digital signatures provide verifiable proof of a party's agreement
- The logic and deterministic nature of smart contract execution promotes efficiency:
	- encouraging sellers to provide well-drafted terms customers are likely to accept
	- and buyers to ask only for what they really need 
- Permanence: find and recreate executed contracts
	- Your transaction history contains the contracts you've executed, and data can be stored so that the parties can recreate the terms they agreed to

My Project:
- The vendor creates their legal terms and determines the redlining options, creates a smart contract to handle offering, accepting, and redlining the agreement, and hosts a platform for interacting with the agreement and smart contract
- The vendor's sales team deploys a new instance of their smart contract for each new offer
- The customer's lawyer pulls the data from the smart contract to populate the terms
- They can accept the contract as is, similar to traditional clickwrap, except they sign it with their wallet AND now there's a record of the agreement
- Or they can redline the terms by selecting from the options configured by the seller
	- The customer submits the redlines as a counteroffer  
	- And only the redlined values are stored in the smart contract
- The vendor's lawyer retrieves the redlines from the values stored in the contract, and the front end generates the surrounding text for context
- Accepting the changes 


Next steps
- To enable retrieval of the agreement:  
	- To preserve confidentiality, the final agreement -- or data needed to recreate it -- should be encrypted with the customer's public key (the vendor can easily rely on off-chain records)
	- and sent in the calldata so it will be available in the logs but not the expensive storage
- Improve UX
