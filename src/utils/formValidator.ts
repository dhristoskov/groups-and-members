import { Errors } from "src/interfaces/error";

export const ValidateInput = (name: string, value: string): Errors => {

        let errors: Errors = {
            name: '',
            first_name: '',
            last_name: ''
        };

        switch(name){ 
            case 'name':
                    errors.name = value.length < 3
                    ? 'Group name must be at least 3 characters long!'
                    : '';
                    break;     
            case 'first_name':
                    errors.name = value.length < 2
                    ? 'First name must be at least 2 characters long!'
                    : '';
                    break;    
            case 'last_name':
                    errors.name = value.length < 2
                    ? 'Last name must be at least 2 characters long!'
                    : '';
                    break;           
            default:
                throw new Error('Something went wrong!');
        };
        return errors
};

/*Check if there is and error and prevent sending
the form with incorrect data*/
export const checkErrors = ( errors: Errors ) => {
    let valid = true;
    Object.values( errors ).forEach(
        /*if have an error string set valid to false*/
        ( val: string ) => val.length > 0 && ( valid = false )
    );
    return valid;
}

/*Check if the input fields are empty 
and prevent sending empty form */
export const emptyValidation = (fields: any) => {
    let valid = false
    Object.values( fields ).forEach(    
        ( field: any ) => field.length <= 0 && ( valid = true )   
    );
    return valid
}