/**
 * This allows us to dynamically create and rotate keys, especially for signing jwts
 */
// import { generateKeyPairSync } from "crypto";
import keypair from "keypair";
import { v4 as uuidv4 } from "uuid";

class KeySecurity {
  generate() {
    const keys = keypair({ bits: 2048 });
    return {
      keyId: uuidv4(),
      privateKey: keys.private,
      publicKey: keys.public,
    };
  }
}

const Key = new KeySecurity();
export default Key;
