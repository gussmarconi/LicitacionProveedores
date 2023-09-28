export const useUtils = () => (v: any) => new Utils(v);

class Utils {
  public value: any;

  constructor(value: any) {
    this.value = (value ?? "").toString();
  }

  toUpperCase() {
    this.value = this.value.toUpperCase();
    return this;
  }

  toName() {
    this.value = this.value.replace(/[^A-Z\u00C0-\u017F .'\-]/ig, "") ?? "";
    return this;
  }

  toNameExtended() {
    this.value = this.value.replace(/[^A-Z0-9\u00C0-\u017F#,.\-_'": ]/ig, "") ?? "";
    return this;
  }

  toNumber(keepAllDigits: boolean = true) {
    this.value = this.value.replace(/[^0-9]/ig, "") ?? "";
    if (!keepAllDigits) this.value = (+this.value).toString();
    return this;
  }

  toNumberLimit(min: number, max: number) {
    if (!this.value) return this;

    this.toNumber(false);
    this.value = +this.value;
    this.value = this.value < min ? min : this.value;
    this.value = this.value > max ? max : this.value;
    this.value = this.value.toString();

    return this;
  }

  toAlphaNumeric() {
    this.value = this.value.replace(/[^A-Z0-9]/ig, "") ?? "";
    return this;
  }

  toLimit(max: number) {
    this.value = this.value.substring(0, max);
    return this;
  }

  toCustom(regExp: any, replace: string) {
    this.value = this.value.replace(regExp, replace) ?? "";
    return this;
  }

  isEmail() {
    return /^(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i.test(this.value);
  }

  isWebsite() {
    return /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/i.test(this.value.toString());
  }
}
