import { useState } from 'react';
import General from '../components/settings/General.component';
import Password from '../components/settings/Password.component';
import DoctorDetails from '../components/settings/DoctorDetails.component';

const doctorTabs = [
  { name: 'General', href: '#', current: true },
  { name: 'Password', href: '#', current: false },
  { name: 'Doctor Details', href: '#', current: false },
];

const patientTabs = [
  { name: 'General', href: '#', current: true },
  { name: 'Password', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Settings({ user }) {
  const [activeTab, setactiveTab] = useState('General');

  const tabsToRender = user.role === 'doctor' ? doctorTabs : patientTabs;

  return (
    <div className="relative h-screen bg-white overflow-hidden flex">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto focus:outline-none">
          <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
            <div className="pt-10 pb-16">
              <div className="px-4 sm:px-6 md:px-0">
                <h1 className="text-3xl font-extrabold text-gray-900">
                  Settings
                </h1>
              </div>
              <div className="px-4 sm:px-6 md:px-0">
                <div className="py-6">
                  <div className="lg:hidden">
                    <label htmlFor="selected-tab" className="sr-only">
                      Select a tab
                    </label>
                    <select
                      id="selected-tab"
                      name="selected-tab"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      defaultValue={
                        tabsToRender.find((tab) => tab.current).name
                      }
                    >
                      {tabsToRender.map((tab) => (
                        <option key={tab.name}>{tab.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="hidden lg:block">
                    <div className="border-b border-gray-200">
                      <nav className="-mb-px flex space-x-8">
                        {tabsToRender.map((tab) => (
                          <a
                            key={tab.name}
                            href={tab.href}
                            onClick={() => setactiveTab(tab.name)}
                            className={classNames(
                              activeTab === tab.name
                                ? 'border-b border-blue-500 text-blue-500'
                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                            )}
                          >
                            {tab.name}
                          </a>
                        ))}
                      </nav>
                    </div>
                  </div>

                  <div className="mt-10 divide-y divide-gray-200">
                    {activeTab === 'General' && (
                      <div>
                        <General user={user} />
                      </div>
                    )}
                    {activeTab === 'Password' && (
                      <div>
                        <Password user={user} />
                      </div>
                    )}

                    {user?.role === 'doctor' && activeTab === 'Doctor Details' && (
                      <div>
                        <DoctorDetails user={user} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Settings;
