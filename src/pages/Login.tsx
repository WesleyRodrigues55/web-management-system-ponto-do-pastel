import { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner'

import Button from '../components/Button.tsx'
import Title from '../components/Title.tsx'
import Input from '../components/Input.tsx';


export function Login() {

    const url = import.meta.env.VITE_URL_BASE;

    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');
    const [token, setToken] = useState(null);
  
    const handleLogin = async (e: any) => {
        e.preventDefault();
        axios
        .post(
            `${url}auth/login-system`, 
            {
                username: username,
                senha: senha
            }, 
        )
        .then((response) => {
            if (response.status == 200) {
                console.log(`token gerado: ${response.headers['authorization']}`);
                localStorage.setItem('token', `${response.headers['authorization']}`);
                window.location.href = '/ '
            }
        })
        .catch((error) => {
            toast.error('Seus dados estão incorretos!', )
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center w-full bg-redPrincipal-200">
            <div className='flex items-center justify-center'>
                <div className="bg-white border border-1 shadow-md rounded-lg px-8 py-6 min-w-[280px] w-[420px]">
                    <div className='flex justify-center mb-5'>
                        <img src="./src/assets/img/logo.png" alt="logo" className='w-[180px]' />
                    </div>
                    <hr />
                    <Title title={"Login"} />
                    <form onSubmit={handleLogin}>
                        <Input label={"Username"} typeInput={"email"} value={username} onChange={(e) => setUsername(e.target.value)} idAndNameInput={"username"} placeholder={"Log in with your username..."} />
                        <Input label={"Password"} typeInput={"password"} value={senha} onChange={(e) => setSenha(e.target.value)} idAndNameInput={"senha"} placeholder={"Log in with your password..."} />
                        
                        <div className='text-center' style={{ display: 'none' }} id='dados-incorretos'>
                            <span className='text-redPrincipal-900 text-sm'>Dados incorretos!</span>
                        </div>
                        <br />
                        <Button type="submit" texto="Login" colorButton="bg-redPrincipal-900" tamanho="md" onClick={()=>{}} />

                        <br /><hr /><br />
                        <div className='text-center'>
                            <a href="#"
                                className="text-xs text-gray-600 hover:text-[#C60606] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C60606]"
                            >
                                    Forgot Password?
                            </a>
                        </div>
                    </form>
                </div>
            </div>
            <Toaster expand={true} richColors/>
        </div>
    )
  }