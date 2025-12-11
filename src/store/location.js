// ## Finder component 2:16:30
// implement some logic=>create a 2nd store of data 2:16:50    
//     track our finder location--=> manage our current directory or folder context within the finder window
//     maintaining the state which is the folder currently being viewed
//     the store will hold metadata about the folder structure itself 
//         and what window ur looking at the screen 2:17:20
//     this will be seperate from our useWindow store 2:17:28
//     ==>create another file within the /store/ 
//     portfolio/src/store/location.js
//         Recap of how zustand and global State managemnt work 2:17:40
import { locations } from "#constants"
import {create} from "zustand"
import { immer } from "zustand/middleware/immer"

const DEFAULT_LOCATION =  locations.work 
const useLocationStore = create(immer((set)=>(
    //immer call coming from zustand middleware
//gets access to a state creator function where we get access to the set func
    { //automatic return of an object of our state 2:18:06
        //define a lot of properties 
        activeLocation: DEFAULT_LOCATION, //default ,location coming from constants

        // setActiveLocation: (location = null) => 
            setActiveLocation: (location) => 
            set((state) => {
            //and 2:19:48 modify the state.activeLocation
            // state.activeLocation = location
            if(location ===undefined) return
            state.activeLocation = location
        }),

        resetActiveLocation: () => set((state) =>{ //2:20:00
            state.activeLocation = DEFAULT_LOCATION
        }),


    }
))) 

export default useLocationStore
