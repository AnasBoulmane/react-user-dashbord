import React, { Suspense, useEffect, useState } from 'react';
import WelcomeBanner from './WelcomeBanner';
import DataTable from './DataTable';
import Card from './Card';
import { User } from 'types/user';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, fetchUsers, saveNewUser, saveUser, selectUsers } from './Dashboard.slice';

const UserForm = React.lazy(() => import('./UserForm'));
const Confirmation = React.lazy(() => import('./Confirmation'));

function Dashboard() {
  const dispatch = useDispatch();
  const customers = useSelector(selectUsers);
  const loadingStatus = useSelector((state) => state.users.status);
  const [shouldDisplayUserForm, displayUserForm] = useState<boolean>(false);
  const [shouldDisplayConfirmation, displayConfirmation] = useState<boolean>(false);
  const [currentUser, setUser] = useState<undefined | Record<string, never> | User>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  // handlers
  const hideUserForm = () => {
    displayUserForm(false);
    setUser(undefined);
  };
  const onCreate = () => {
    displayUserForm(true);
    setUser({});
  };
  const onEdit = (user: User) => {
    displayUserForm(true);
    setUser(user);
  };
  const onDelete = (user: User) => {
    displayConfirmation(true);
    setUser(user);
  };
  const onSubmit = (userData) => {
    if (!userData) return;
    const shouldUpdate = userData.id;
    dispatch(
      shouldUpdate
        ? saveUser(userData) // call PUT /users/id
        : saveNewUser({ ...userData, id: customers.length + 1 }), // call POST /users
    );
    hideUserForm();
  };
  const onDeleteConfirm = async () => {
    await dispatch(deleteUser(currentUser));
    hideConfirmation();
  };
  const hideConfirmation = () => {
    displayConfirmation(false);
    setUser(undefined);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Welcome banner */}
      <WelcomeBanner />

      {/* Dashboard actions */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <h2 className="text-2xl md:text-3xl text-slate-800 font-bold ">Customers ✨</h2>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Add view button */}
          <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={onCreate}>
            <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="xs:block ml-2">Add User</span>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-12 gap-6">
        {/* Card (Customers) */}
        {!shouldDisplayUserForm && (
          <Card title="Customers">
            {loadingStatus !== 'idle' && <div className="text-center">loading...</div>}

            {customers && (
              <DataTable
                data={customers}
                actions={{
                  name: 'Actions',
                  edit: onEdit,
                  delete: onDelete,
                }}
                columns={[
                  {
                    name: 'Id',
                    selector: (row) => row.id,
                  },
                  {
                    name: 'Name',
                    selector: (row) => row.name,
                  },
                  {
                    name: 'Username',
                    selector: (row) => row.username,
                  },
                  {
                    name: 'City',
                    selector: (row) => row.address?.city,
                  },
                  {
                    name: 'Email',
                    selector: (row) => row.email,
                  },
                ]}
              />
            )}
          </Card>
        )}

        {/* Card (Customers) */}
        {shouldDisplayUserForm && (
          <Card title={currentUser.id ? 'Edit Customer Info' : 'Create New Customer'}>
            <Suspense fallback={<div>Loading...</div>}>
              <UserForm userData={currentUser} onSubmit={onSubmit} onAbort={hideUserForm} />
            </Suspense>
          </Card>
        )}

        {shouldDisplayConfirmation && (
          <Suspense fallback={<div>Loading...</div>}>
            <Confirmation
              title="Delete customer"
              message="Are you sure you want to delete this User? All of his
                  data will be permanently removed. This action cannot be undone."
              onConfirm={onDeleteConfirm}
              onAbort={hideConfirmation}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
