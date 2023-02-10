import { toHex, hexToBytes, utf8ToBytes } from "ethereum-cryptography/utils.js";
import { encrypt } from "ethereum-cryptography/aes.js";

class Terms {
    constructor(r9, r10) {
        this.intro = 'These Terms of Service ("Terms") between SaaSy.io and the Customer referenced in the Order ("you" or "your") govern your subscription to the Services and SaaSy.io`s provision of the Services to you. ';
        this.one = '1.  PROVISION AND USE.   SaaSy.io will make the Services available to Customer, and Customer is authorized to access and use the Services according to the Documentation and these Terms, during the Subscription Term. ';
        this.two = '2. CUSTOMER DATA.   Customer is responsible for all data transmitted to or through the Services by or on behalf Customer ("Customer Data") and grants SaaSy.io a non-exclusive, worldwide, royalty-free license to use Customer Data to provide and improve the Services. ';
        this.three = '3. INTELLECTUAL PROPERTY.   The Services (including, for example, its algorithms, calculations, organization, look and feel, and the underlying software code) is and will remain the sole property of SaaSy.io, and SaaSy.io is and will remain the sole owner of all intellectual property embodied or practiced by the Services. Each party reserves all intellectual property rights not expressly granted in these Terms. ';
        this.four = '4. WARRANTY.   The Services will perform according to the Documentation” for the Subscription Term. SaaSy.io will have 30 days to correct a failure of this warranty after receiving notice, and if it cannot do so, Customer may terminate the  Subscription immediately and receive a prorated refund for its unused subscription. The Services are otherwise provided "as is," and SaaSy.io disclaims all other warranties, express or implied. ';
        this.five = '5. CONFIDENTIAL INFORMATION.   “Confidential Information” is all information, regardless of the medium through which it is conveyed, that is marked as “Confidential” by the disclosing party or that would reasonably be deemed likely to be confidential. Customer`s Confidential Information includes all Customer Data, and SaaSy.io`s Confidential Information includes the non-public features and functionality of the Services. Confidential Information excludes all information that: (i) is or becomes publicly known, other than through a breach of a confidentiality obligation owed to the disclosing party; or (ii) was known to the receiving party before disclosure, other than through a breach of a confidentiality obligation owed to the disclosing party. The receiving party will use the Confidential Information of the disclosing party only as necessary to perform its obligations and exercise its rights under this Agreement and will use reasonable care to protect such Confidential Information. At the termination of this Agreement, or upon the disclosing party`s request, the receiving party will destroy the disclosing party`s Confidential Information that is then in its possession. ';
        this.six = '6.   INDEMNIFICATION.   To “Indemnify” is defined as to (i) defend against all third party claims and regulatory actions and (ii) to pay all amounts under all theories of liability and damages awarded to such third party or accepted in settlement or imposed as fines of any kind. SaaSy.io will Indemnify Customer for the infringement of a patent or copyright, provided that the infringement arises through Customer`s use of the Services according to the Documentation, either alone or (when GypsyApp would be liable for indirect or contributory infringement) in combination with other Customer technology or processes. Each party will Indemnify the other for their use or transfer of personally identifiable information or Customer Data in a manner inconsistent with this Agreement. Each party will Indemnify the other for their use or transfer of personally identifiable information or Customer Data in a manner inconsistent with these Terms.';
        this.seven = '7. LIMITATION OF LIABILITY.   With the exception of violations involving Confidential Information and amounts owed under a party`s obligation to Indemnify, neither party`s total liability to the other will exceed the Annual Subscription Cost. ';
        this.eight = '8. LIMITATION OF DAMAGES.   Each party will be liable to the other for direct damages only. As such, the following types of damages will be excluded, regardless of the underlying theory of recovery: indirect damages, consequential damages, special damages, punitive damages, lost profits, lost reputation, and the cost of replacement services. ';
        if(r9 != 0){
            this.nine = `9.  UPTIME.   The Services will be available to Customer ${r9}% of each month. If SaaSy.io fails to meet this uptime commitment for three consecutive months or any four months within the Subscription Term, Customer may terminate the Order and receive a prorated refund. `;
        }
        else {
            this.nine = '9.  UPTIME.   The Services will be available to Customer 95% of each month. If SaaSy.io fails to meet this uptime commitment for three consecutive months or any four months within the Subscription Term, Customer may terminate the Order and receive a prorated refund. ';
        }
        if(r10 != 0){
            this.ten = `10. MISCELLANEOUS.   No amendment or waiver under these Terms will be effective unless it is in writing and signed by both parties. A waiver granted on one occasion will not operate as a waiver on other occasions. United States federal laws and the state laws of ${r10} govern these Terms. If a provision of these Terms is deemed unenforceable, it will be modified to capture the parties original intent or, if the provision cannot be saved, it will be removed from these Terms. These Terms are the entire agreement of the parties with respect to its subject matter and supersedes all other written or oral agreements. `;
        }
        else {
            this.ten = '10. MISCELLANEOUS.   No amendment or waiver under these Terms will be effective unless it is in writing and signed by both parties. A waiver granted on one occasion will not operate as a waiver on other occasions. United States federal laws and the state laws of California govern these Terms. If a provision of these Terms is deemed unenforceable, it will be modified to capture the parties original intent or, if the provision cannot be saved, it will be removed from these Terms. These Terms are the entire agreement of the parties with respect to its subject matter and supersedes all other written or oral agreements. ';
        }    
    }
    getFullTerms(){
        return `${this.intro}${this.one}${this.two}${this.three}${this.four}${this.five}${this.six}${this.seven}${this.eight}${this.nine}${this.ten}`;
    }
    encryptTerms(privateKey){
        const toEncrypt = utf8ToBytes(this.getFullTerms());
        const key = hexToBytes(privateKey).slice(2, 18);
        const mode = "aes-128-ctr"; 
        const p = true;
        const encrypted = encrypt(toEncrypt, key, key, mode, p);
        return toHex(encrypted);
    }
}

export default Terms;