import { Button } from "./Components/Button"
import { Card } from "./Components/Card"
import { Sidebar } from "./Components/Sidebar"
import { AddIcon } from "./icons/AddIcon"
import { Logo } from "./icons/Logo"
import { ShareIcon } from "./icons/ShareIcon"
import { TwiiterIcon } from "./icons/TwitterIcon"
import { YoutubeIcon } from "./icons/YoutubeIcon"

function App() {
 

  return (
    <>
   <div className="flex">
     <div className="w-lg">
      <Sidebar hover = "false" Icon={<Logo size="lg"/>} title="RefRence" size="lg" />

      <div className="mt-12">
        <Sidebar hover="true" Icon={<TwiiterIcon size="md"/>} title="Tweets" size="md" />

        <Sidebar hover="true" title="Youtube" Icon={<YoutubeIcon size="md"/>} size="md" />
      </div>

    </div>

      <div className="w-full">
       <div className="flex justify-between items-center bg-gray-200">
         <div className="font-bold text-3xl pl-4">
          All Notes
        </div>
        <div className="pt-4 pr-2 bg-gray-200 flex items-center justify-end ">
    
          <Button startIcon={<AddIcon size="lg"/>} title="Add Content" size = "lg" type="primary">
          </Button>
        
          <Button startIcon={<ShareIcon size="lg"/>} title="Share Brain" size="lg" type="secondary" ></Button>
    
        </div >
       </div>

    <div className="pt-12 pl-4 min-h-screen w-full bg-gray-200 flex flex-wrap">
    <Card title="Job" link="https://youtu.be/NDlSwXRfpvc?si=pH_uXMKiwzapSv1G" type="youtube" ></Card>
    <Card title="tweet" link="https://twitter.com/Pankajkumar_dev/status/1923384235815035388" type="twitter"></Card>
    </div>
      </div>
   </div>
    
    </>
  ) 
}

export default App
