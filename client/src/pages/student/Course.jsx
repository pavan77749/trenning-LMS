import { Card,CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"


const Course = () => {
  return (
    <div>
        <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="relative">
                <img src="data:image/png;base64,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" 
                alt="course" className="w-full h-36 object-cover rounded-t-lg "/>
            </div>
            <CardContent className="px-5 py-5 space-y-3">
                <h1 className="hover:underline font-bold text-lg truncate">Master Nextjs Course in 30 hours 2025</h1>
                <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
<h1 className="font-medium text-sm">Pavan </h1>
                </div>
<Badge className="bg-purple-800 text-white px-2 py-1 text-xs rounded-full" >Advance</Badge>
                </div>
                <div className="text-lg font-bold font-sans ">
                    <span>₹599</span>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default Course