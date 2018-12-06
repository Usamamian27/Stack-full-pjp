import React from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({
                            name,
                            placeholder,
                            value,
                            error,
                            error_verify,
                            info,
                            type,
                            onChange,
                            disabled

                        }) => {

    return (
        <div className="form-group">
            <input
                type={type}
                className={
                       classnames('form-control form-control-lg',{
                           'is-invalid' : error || error_verify
                       })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            {// it is a feedback if there occurs an error
            }
            {info && <small className="form-text text-muted">{info}</small>}
            {error && (<div className="invalid-feedback">{error}</div> )}
            {error_verify && (<div className="invalid-feedback">{error_verify}</div> )}



        </div>
    );

}

export default TextFieldGroup;
