export class accountValidator {
    private _usernameChanged: boolean = false;
    private _passwordChanged: boolean = false;
    private _emailChanged: boolean = false;
    private _roleBChanged: boolean = false;
    private _visibleDefaultUsername: boolean = false;
    private _visibleDefaultPassword: boolean = false;
    private _visibleDefaultEmail: boolean = false;
    private _visibleDefaultRoleB: boolean = false;
    private _formAndSnapNotEquals: boolean = false;
    private _buttonState: boolean = false;

    constructor(
        usernameChanged: boolean, 
        passwordChanged: boolean, 
        emailChanged: boolean, 
        roleBChanged: boolean,) {
        this._usernameChanged = usernameChanged;
        this._passwordChanged = passwordChanged;
        this._emailChanged = emailChanged;
        this._roleBChanged = roleBChanged;
        this.updateDefaultUsernameVisibility();
        this.updateDefaultPasswordVisibility();
        this.updateDefaultEmailVisibility();
        this.updateDefaultRoleBVisibility();
        this.updateformAndSnapNotEquals();
        this.updateButtonState();
    }

    set usernameChanged(value: boolean) {
        this._usernameChanged = value;
        this.updateformAndSnapNotEquals();
        this.updateDefaultUsernameVisibility();
    }

    set passwordChanged(value: boolean) {
        this._passwordChanged = value;
        this.updateformAndSnapNotEquals();
        this.updateDefaultPasswordVisibility();
    }

    set emailChanged(value: boolean) {
        this._emailChanged = value;
        this.updateformAndSnapNotEquals();
        this.updateDefaultEmailVisibility();
    }

    set roleBChanged(value: boolean) {
        this._roleBChanged = value;
        this.updateformAndSnapNotEquals();
        this.updateDefaultRoleBVisibility();
    }

    get usernameChanged(): boolean {
        return this._usernameChanged;
    }

    get passwordChanged(): boolean {
        return this._passwordChanged;
    }

    get emailChanged(): boolean {
        return this._emailChanged;
    }

    get roleBChanged() {
        return this._roleBChanged;
    }

    get visibleDefaultUsername(): boolean {
        return this._visibleDefaultUsername;
    }

    get visibleDefaultPassword(): boolean {
        return this._visibleDefaultPassword;
    }

    get visibleDefaultEmail(): boolean {
        return this._visibleDefaultEmail;
    }

    get visibleDefaultRoleB(): boolean {
        return this._visibleDefaultRoleB;
    }

    get buttonState(): boolean {
        return this._buttonState;
    }
    
    private updateDefaultUsernameVisibility(): void {
        this._visibleDefaultUsername = this._usernameChanged;
    }

    private updateDefaultPasswordVisibility(): void {
        this._visibleDefaultPassword = this._passwordChanged;
    }

    private updateDefaultEmailVisibility(): void {
        this._visibleDefaultEmail = this._emailChanged;
    }

    private updateDefaultRoleBVisibility(): void {
        this._visibleDefaultRoleB = this._roleBChanged;
    }

    private updateformAndSnapNotEquals(): void {
        this._formAndSnapNotEquals = this._usernameChanged || this._passwordChanged || this._emailChanged || this._roleBChanged;
        this.updateButtonState();
    }

    private updateButtonState(): void {
        this._buttonState = this._formAndSnapNotEquals;
    }
}
