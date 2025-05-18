import { Button } from "./Components/Button"
import { Card } from "./Components/Card"
import { AddIcon } from "./icons/AddIcon"
import { ShareIcon } from "./icons/ShareIcon"

function App() {
 

  return (
    <>
   <div className="flex">
     <div className="w-lg">
      hi there
    </div>

      <div className="w-full">
        <div className="pt-4 pr-2 bg-gray-200 flex items-center justify-end ">
    
    <Button startIcon={<AddIcon size="lg"/>} title="Add Content" size = "lg" type="primary">
    </Button>
   
    <Button startIcon={<ShareIcon size="lg"/>} title="Share Brain" size="lg" type="secondary" ></Button>
    
    </div >

    <div className="pt-4 pl-4 min-h-screen w-full bg-gray-200 flex flex-wrap">
    <Card title="Job" link="https://youtu.be/NDlSwXRfpvc?si=pH_uXMKiwzapSv1G" type="youtube" ></Card>
    <Card title="tweet" link="https://twitter.com/Pankajkumar_dev/status/1923384235815035388" type="twitter"></Card>
    </div>
      </div>
   </div>
    
    </>
  ) 
}

export default App
