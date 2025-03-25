import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { UserInfo } from "../types/booking";
import clientService from "../services/clientService";

interface LoginFormProps {
  userInfo: UserInfo;
  onUserInfoChange: (info: UserInfo) => void;
  setCurrentStep: any;
}

export function UserLoginForm({ userInfo, onUserInfoChange, setCurrentStep }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await clientService.login(userLogin).then((response) => {
        console.log(response);
        onUserInfoChange(response.data.user);
        setCurrentStep("payment");
      });
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);

      setError("email ou mot de passe incorrect");
      setIsLoading(false);
    }
  };

  return (
      <div className="bg-white p-6 w-full">
        <div className="mt-4 space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Champ Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
                type="email"
                id="email"
                name="email"
                value={userLogin.email}
                onChange={(e) => setUserLogin({...userLogin, email: e.target.value})}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-[#e86126] focus:ring-[#e86126]"
                required
            />
          </div>

          {/* Champ Mot de passe */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <div className="relative mt-1">
              <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={userLogin.password}
                  onChange={(e) => setUserLogin({...userLogin, password: e.target.value})}
                  className="block w-full rounded-md border border-gray-300 p-2 shadow-sm pr-10 focus:border-[#e86126] focus:ring-[#e86126]"
                  required
              />
              <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
              >
                {showPassword ? <EyeOffIcon className="w-5 h-5 text-gray-500"/> :
                    <EyeIcon className="w-5 h-5 text-gray-500"/>}
              </button>
            </div>
          </div>

          {/* Bouton de connexion */}
          <button
              disabled={isLoading}
              style={{
                cursor: isLoading ? "not-allowed" : "pointer",
                backgroundColor: isLoading ? "#ccc" : "#e86126",
              }}
              onClick={handleLogin}
              className="w-full text-white py-2 rounded-md font-semibold hover:bg-[#ec7f2b] transition"
          >
            Se connecter
          </button>
        </div>
      </div>

  );
}
