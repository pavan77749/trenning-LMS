import {Card, CardDescription, CardHeader, CardTitle,CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

const LectureTab = () => {
  return (
    <Card>
        <CardHeader className="flex justify-between">
            <div>
                <CardTitle>Edit Lecture</CardTitle>
                <CardDescription> Make changes to your lecture here. Click save when you are done</CardDescription>
            </div>
            <div className='flex items-center gap-2'>
                <Button variant="destructive">Remove Lecture</Button>
            </div>
        </CardHeader>
        <CardContent>
            <div className='my-5'>
                <Label>Title</Label>
                <Input  type="text" placeholder="EX. Introduction to Javascript"/>
            </div>
            <div className='my-5'>
                <Label>Video <span className='text-red-500'>*</span></Label>
                <Input  type="file" accept="video/*"  className="w-fit"/>
            </div>
            <div className="flex items-center space-x-2 my-5">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Is this video Free</Label>  
            </div>
            <div>
                <Button className="bg-purple-800">Update Lecture</Button>
            </div>
        </CardContent>
    </Card>
  )
}

export default LectureTab