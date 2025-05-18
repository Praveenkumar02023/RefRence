import { Button } from "./Components/Button"
import { AddIcon } from "./icons/AddIcon"
import { ShareIcon } from "./icons/ShareIcon"

function App() {
 

  return (
    <>
    
    <div className="flex items-center justify-end mt-8 mr-2">
    
    <Button startIcon={<AddIcon size="lg"/>} title="Add Content" size = "lg" type="primary">
    </Button>
   
    <Button startIcon={<ShareIcon size="lg"/>} title="Share Brain" size="lg" type="secondary" ></Button>
    
    </div>

    
    </>
  )
}

export default App
