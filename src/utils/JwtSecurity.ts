import jwt, { Algorithm } from "jsonwebtoken";
import Key from "./Key";

export default class JwtSecurity {
  private issuer: string;
  private audience: string;
  private algorithm: Algorithm = "RS256";
  private expiresIn = "1h";

  keyId!: string;
  publicKey!: string;
  private privateKey!: string;

  constructor({
    aud,
    iss,
    alg,
    exp,
  }: {
    aud: string;
    iss: string;
    alg?: Algorithm;
    exp?: string;
  }) {
    // set values
    this.audience = aud;
    this.issuer = iss;
    if (alg) this.algorithm = alg;
    if (exp) this.expiresIn = exp;

    // generate new keys
    this.rotate();
  }

  rotate() {
    const { keyId, publicKey, privateKey } = Key.generate();
    this.keyId = keyId;
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  sign(subject: string, payload: Record<string, any>) {
    return jwt.sign(payload, this.privateKey, {
      subject,
      expiresIn: this.expiresIn,
      audience: this.audience,
      encoding: "UTF8",
      keyid: this.keyId,
      algorithm: this.algorithm,
      issuer: this.issuer,
    });
  }

  verify(token: string) {
    return jwt.verify(token, this.publicKey, {
      issuer: this.issuer,
      audience: this.audience,
      algorithms: [this.algorithm],
    });
  }
}
