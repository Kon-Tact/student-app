export class studentValidator {
    private _nameChanged: boolean = false;
    private _phoneNumberChanged: boolean = false;
    private _emailChanged: boolean = false;
    private _addressChanged: boolean = false;
    private _visibleDefaultName: boolean = false;
    private _visibleDefaultPhonenumber: boolean = false;
    private _visibleDefaultEmail: boolean = false;
    private _visibleDefaultAddress: boolean = false;
    private _formAndSnapNotEquals: boolean = false;
    private _buttonState: boolean = false;

    constructor(
        nameChanged: boolean, 
        phoneNumberChanged: boolean, 
        emailChanged: boolean, 
        addressChanged: boolean,) {
        this._nameChanged = nameChanged;
        this._phoneNumberChanged = phoneNumberChanged;
        this._emailChanged = emailChanged;
        this._addressChanged = addressChanged;
        this.updateDefaultNameVisibility();
        this.updateDefaultPhonenumberVisibility();
        this.updateDefaultEmailVisibility();
        this.updateDefaultAddressVisibility();
        this.updateformAndSnapNotEquals();
        this.updateButtonState();
    }

    get nameChanged(): boolean {
        return this._nameChanged;
    }

    get phoneNumberChanged(): boolean {
        return this._phoneNumberChanged;
    }

    get emailChanged(): boolean {
        return this._emailChanged;
    }

    get addressChanged(): boolean {
        return this._addressChanged;
    }

    set nameChanged(value: boolean) {
        this._nameChanged = value;
        this.updateformAndSnapNotEquals();
        this.updateDefaultNameVisibility();
    }
    
    set phoneNumberChanged(value: boolean) {
        this._phoneNumberChanged = value;
        this.updateformAndSnapNotEquals();
        this.updateDefaultPhonenumberVisibility();
    }

    set emailChanged(value: boolean) {
        this._emailChanged = value;
        this.updateformAndSnapNotEquals();
        this.updateDefaultEmailVisibility();
    }

    set addressChanged(value: boolean) {
        this._addressChanged = value;
        this.updateformAndSnapNotEquals();
        this.updateDefaultAddressVisibility();
    }

    get visibleDefaultName(): boolean {
        return this._visibleDefaultName;
    }

    get visibleDefaultPhonenumber(): boolean {
        return this._visibleDefaultPhonenumber;
    }

    get visibleDefaultEmail(): boolean {
        return this._visibleDefaultEmail;
    }

    get visibleDefaultAddress(): boolean {
        return this._visibleDefaultAddress;
    }

    get buttonState(): boolean {
        return this._buttonState;
    }

    private updateDefaultNameVisibility(): void {
        this._visibleDefaultName = this._nameChanged;
    }

    private updateDefaultPhonenumberVisibility(): void {
        this._visibleDefaultPhonenumber = this._phoneNumberChanged;
    }

    private updateDefaultEmailVisibility(): void {
        this._visibleDefaultEmail = this._emailChanged;
    }

    private updateDefaultAddressVisibility(): void {
        this._visibleDefaultAddress = this._addressChanged;
    }

    private updateformAndSnapNotEquals(): void {
        this._formAndSnapNotEquals = this._nameChanged || this._phoneNumberChanged || this._emailChanged || this._addressChanged;
        this.updateButtonState();
    }

    private updateButtonState(): void {
        this._buttonState = this._formAndSnapNotEquals;
    }

}