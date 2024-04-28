import Button from '../components/Button.tsx'
import Title from '../components/Title.tsx'

export function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center w-full bg-white">
            <div className="bg-white border border-1 rounded-lg px-8 py-6 max-w-md">
            <Title title={"Login"} />
                <form action="#">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                        <input type="email" id="email" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#C60606] focus:border-[#C60606]" placeholder="your@email.com" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                        <input type="password" id="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#C60606] focus:border-[#C60606]" placeholder="Enter your password" required />
                        <a href="#"
                            className="text-xs text-gray-600 hover:text-[#C60606] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C60606]">Forgot
                            Password?</a>
                    </div>
                    <Button type="submit" texto="Login" colorButton="bg-redPrincipal-900" tamanho="md" onClick={()=>{}} />
                </form>
            </div>
        </div>
    )
  }