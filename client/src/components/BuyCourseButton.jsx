import React, { useEffect } from 'react'
import { Button } from './ui/button'
import {useCreateCheckoutSessionMutation} from '../features/api/purchaseApi'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

const BuyCourseButton = ({courseId}) => {
  const [createCheckoutSession,{data,isLoading,isSuccess,isError,error}] = useCreateCheckoutSessionMutation()
  const purchaseCourseHandler = async () => {
    try {
      await createCheckoutSession(courseId)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
  if(isSuccess){
  if(data?.url){
    window.location.href = data.url; // Redirect to Stripe Checkout url
    }
    else{
      toast.error("Failed to create session")
  }
  }
  if(isError){
    toast.error( error?.data?.message || "Failed to create session ")}
  }, [data,isSuccess,isError,error])
  return (
    <div>
        <Button disabled={isLoading} className="w-full" onClick={purchaseCourseHandler}>
          {
            isLoading ? (
              <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please Wait
              </> 
            ) : "Purchase Course"
          }
          </Button>
    </div>
  )
}

export default BuyCourseButton