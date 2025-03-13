import React from "react";
import { UserInfo } from "../types/booking";

interface UserFormProps {
  userInfo: UserInfo;
  onUserInfoChange: (info: UserInfo) => void;
}

export function UserForm({ userInfo, onUserInfoChange }: UserFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUserInfoChange({
      ...userInfo,
      [name]: value,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
            Prénom
          </label>
          <input
            type="text"
            id="firstName"
            name="firstname"
            value={userInfo.firstname}
            onChange={handleChange}
            style={{
              border: "1px solid #bbbbbb",
              padding: "5px",
            }}
            className="mt-1 block w-full rounded-md  shadow-sm focus:border-purple-500 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
            Nom
          </label>
          <input
            type="text"
            id="lastName"
            name="lastname"
            value={userInfo.lastname}
            onChange={handleChange}
            style={{
              border: "1px solid #bbbbbb",
              padding: "5px",
            }}
            className="mt-1 block w-full rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            style={{
              border: "1px solid #bbbbbb",
              padding: "5px",
            }}
            className="mt-1 block w-full rounded-md  shadow-sm focus:border-purple-500 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Téléphone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={userInfo.phone}
            onChange={handleChange}
            style={{
              border: "1px solid #bbbbbb",
              padding: "5px",
            }}
            className="mt-1 block w-full rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
            required
          />
        </div>
      </div>
    </div>
  );
}
