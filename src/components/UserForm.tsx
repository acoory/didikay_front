import React from "react";
import { UserInfo } from "../types/booking";
import { EyeIcon, EyeOffIcon } from "lucide-react";

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
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="bg-white">
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
        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Mot de passe
          </label>
          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={userInfo.password}
              onChange={handleChange}
              style={{
                border: "1px solid #bbbbbb",
                padding: "5px",
              }}
              className="block w-full rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 pr-10"
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none">
              {showPassword ? <EyeOffIcon className="w-5 h-5 text-gray-500" /> : <EyeIcon className="w-5 h-5 text-gray-500" />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Téléphone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Facultatif"
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
