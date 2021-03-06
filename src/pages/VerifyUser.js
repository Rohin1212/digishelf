import React, { useState, useContext, useEffect } from 'react'
import Button from '../components/Button'
import Snackbar from '../components/Snackbar'
import ClipLoader from 'react-spinners/ClipLoader'
import AuthContext from '../context/AuthContext'
import { verifyUser } from '../utils/auth'

const VerifyUser = ({ history }) => {
  const [vCode, setVCode] = useState('')
  const [username, setUsername] = useState('')
  const [snackbar, setSnackbar] = useState({
    show: false,
    color: '',
    message: ''
  })
  const [authContext] = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setUsername(authContext?.user?.username)
    if (authContext?.user?.attributes?.email_verified) {
      history.push('/')
    }
  }, [authContext])

  const handleChange = (event) => {
    const { value } = event.target
    setVCode(value)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()

    setIsLoading(true)
    const res = await verifyUser(username, vCode)
    if (res) {
      setSnackbar({
        show: true,
        color: 'green-500',
        message: 'Correct verification code'
      })
      setIsLoading(false)
      history.push('/login')
    } else {
      setSnackbar({
        show: true,
        color: 'red-500',
        message: 'Incorrect verification code'
      })
      setIsLoading(false)
    }
  }

  return (
    <main>
      <div className='container mx-auto px-2 py-6 flex flex-col justify-center items-center'>
        <div className=' max-w-lg'>
          <h1 className='prose prose-2xl font-bold'>Verify your email</h1>
          <div className='bg-green-300 py-2 px-4 rounded shadow text-green-800'>
            <p>We've sent verification code to your email address</p>
          </div>
          <form onSubmit={handleSubmit} className='mt-4'>
            <div>
              <input
                type='text'
                name='verificationCode'
                onChange={handleChange}
                maxlength={6}
                value={vCode}
                className='form-input px-3 rounded w-full shadow'
                placeholder='Enter verification code'
              />
            </div>
            <Button
              className='bg-secondary text-white disabled:opacity-50 mt-2'
              disabled={isLoading}
            >
              Verify{' '}
              <ClipLoader
                height={20}
                width={20}
                css={`
                  ${!isLoading ? 'display:none;' : ''}vertical-align:middle;
                  height: 20px;
                  width: 20px;
                `}
              />
            </Button>{' '}
          </form>
          <Snackbar
            color={snackbar.color}
            show={snackbar.show}
            setShow={() => {
              setSnackbar({ ...snackbar, show: false })
            }}
          >
            {snackbar.message}
          </Snackbar>
        </div>
      </div>
    </main>
  )
}

export default VerifyUser
