import React from 'react';
import classnames from 'classnames';

const SelectFieldGroup = ({
                              name,
                              value,
                              error,
                              info,
                              onChange,
                              options

                          }) => {

    const selectOptions = options.map(option => (
        <option key={option.label} value={option.value}>

            {option.label}

        </option>
    ));


    return (
        <div className="form-group">
            <select
                className={
                    classnames('form-control form-control-lg',{
                        'is-invalid' : error
                    })}
                name={name}
                value={value}
                onChange={onChange}>

                {selectOptions}


            </select>
            {// it is a feedback if there occurs an error
            }
            {info && <small className="form-text text-muted">{info}</small>}
            {error && (<div className="invalid-feedback">{error}</div> )}



        </div>
    );

}

export default SelectFieldGroup;
