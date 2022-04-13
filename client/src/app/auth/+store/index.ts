import { IRootState } from 'src/app/+store';
import { IUser } from 'src/app/core/interfaces';

export * from './reducers';

export interface ILoginPageState {

}

export interface IProfilePageState {
    currentProfile: IUser;
    isInEditMode: boolean;
}

export interface IAuthState {
    profile: IProfilePageState;
    login: ILoginPageState;
}

export interface IAuthModuleState extends IRootState {
    auth: IAuthState;
}