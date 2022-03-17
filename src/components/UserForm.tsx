import React from 'react';
import { useForm } from 'react-hook-form';
import { User } from 'types/user';

interface UserFormProps {
  userData?: User;
  onSubmit: (data: User) => any;
  onAbort?: (event: any) => any;
}

const rEmail =
  // eslint-disable-next-line
  /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;

const UserForm: React.FC<UserFormProps> = ({ userData: initialValues, onAbort, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <form onSubmit={handleSubmit((data) => onSubmit({ ...data, id: initialValues?.id } as any))}>
      <div className="px-4 py-5 bg-white sm:p-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              defaultValue={initialValues?.name}
              {...register('name', {
                validate: (value) => value.length > 3,
              })}
              autoComplete="given-name"
              className={`${
                errors.name
                  ? 'border-rose-500 ring-rose-500 focus:border-rose-500 focus:ring-rose-500 bg-rose-100'
                  : 'focus:ring-indigo-500 focus:border-indigo-500 border-gray-300'
              } mt-1 block w-full shadow-sm sm:text-sm rounded-md`}
            />
            {errors.name && <p className="text-sm text-rose-500 mt-1">Your last name is less than 3 characters</p>}
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              defaultValue={initialValues?.username}
              {...register('username')}
              autoComplete="family-name"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-6 sm:col-span-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="text"
              defaultValue={initialValues?.email}
              {...register('email', {
                validate: {
                  required: (value) => value.trim().length > 0,
                  invalidEmail: (value) => value.search(rEmail) !== -1,
                },
              })}
              autoComplete="email"
              className={`${
                errors.email
                  ? 'border-rose-500 ring-rose-500 focus:border-rose-500 focus:ring-rose-500 bg-rose-100'
                  : 'focus:ring-indigo-500 focus:border-indigo-500 border-gray-300'
              } mt-1 block w-full shadow-sm sm:text-sm rounded-md`}
            />
            {errors.email && errors.email.type === 'required' && (
              <p className="text-sm text-rose-500 mt-1">Email is required</p>
            )}
            {errors.email && errors.email.type === 'invalidEmail' && (
              <p className="text-sm text-rose-500 mt-1">Email is invalid</p>
            )}
          </div>
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        {onAbort && (
          <button className="btn border-slate-200 hover:border-slate-300 bg-white" onClick={onAbort}>
            Cancel
          </button>
        )}
        {onSubmit && (
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 ml-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
          >
            Save
          </button>
        )}
      </div>
    </form>
  );
};

export default UserForm;
