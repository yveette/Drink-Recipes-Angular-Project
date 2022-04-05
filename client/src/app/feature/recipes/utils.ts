import { AbstractControl, ValidationErrors } from "@angular/forms";

export function ingredientsValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    
    if (!value) {
        return null;
    }
    
    // TODO: valid ingredients
    // const arr = value.split(', ');
    // console.log('test array => ', arr);
    // if (!/.{5,}@gmail\.(bg|com)/.test(value)) {
    //     return {
    //         ingredients: true,
    //     }
    // }

    return null;
}