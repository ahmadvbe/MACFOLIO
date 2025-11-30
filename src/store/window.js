// zustand is more fast, scalable, barebones state management solution
//     npm i zustand 
//         1:16:24 start creating our first store - glocal objects
//             portfolio/src/store
//             portfolio/src/store/window.js : this store will be all abt managing our windows 1:16:48
            
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from '#constants'
import { Immer } from 'immer'
import {produce} from 'immer';
import {create} from 'zustand'

// //1:16:55 ready to create a store
// const useWindowStore = create((set)=>{ instead of hving this immediate set - we call immer withinb create
    const useWindowStore = create((set)=>(  //immediate retun of an object {}
            //be carefull not to mutate any data that u pass 1:17:17
    //1:17:30 immer middleware lets u perform immutable updates
    //npm i immer =>will let write mutating code in ur setters
    //while actually it keeps states immutable under the hood 1:17:48
    //instaed of manually using the spread {...state} operators and so on
        //here we can define all of our store 1:18:18
        //where u can have some simple variables that just hold the data
        //such as windiows where u can define an array of all the windows that u hve 1:18:26
        {
        windows:  WINDOW_CONFIG, //DEINED @ CONSTANTS - setting us the initial window config
        //1:19:00 then we hve to figure out which is the next z index 
        nextZIndex: INITIAL_Z_INDEX + 1 ,// so that wwe can make that window appear on top of the other one
        
         //1:19:48 now we can start creating additional functions that we can use to manage out windows   
         //the following shows how we will be managin opening and closing our windows
        openWindow: (windowKey, data = null) =>  
                    set(produce((state) =>{
                //get access to the window 1:20:48
                const win = state.windows[windowKey]
                //defencise if the windowKey is invalid , then do ntg
                if (!win) return
                win.isOpen = true 
                win.zIndex = state.nextZIndex
                win.data = data ?? win.data
                state.nextZIndex++
            })),

        closeWindow: (windowKey) =>  
                    set(produce((state) =>{
                const win = state.windows[windowKey]
                //defencise if the windowKey is invalid , then do ntg
                if (!win) return
                win.isOpen = false  
                win.zIndex = INITIAL_Z_INDEX
                win.data = null
            })),

            //if we wana bring the window that is already open on top 1:20:39
        focusWindow: (windowKey) =>  set((state) =>{ //1:22:20
                const win = state.windows[windowKey]
                win.zIndex = state.nextZIndex++ //update the zIndex
                
            })
       
        }
    )
    )

// // Create Zustand store with Immer middleware -- poe fix
// const useWindowStore = create((set) => 
//     produce((draft) => {
//         draft.windows = WINDOW_CONFIG; // Initial window config
//         draft.nextZIndex = INITIAL_Z_INDEX + 1; // Set initial Z index

//         draft.openWindow = (windowKey, data = null) => {
//             const win = draft.windows[windowKey];
//             win.isOpen = true; 
//             win.zIndex = draft.nextZIndex++;
//             win.data = data ?? win.data;
//         };

//         draft.closeWindow = (windowKey) => {
//             const win = draft.windows[windowKey];
//             win.isOpen = false;  
//             win.zIndex = INITIAL_Z_INDEX;
//             win.data = null;
//         };

//         draft.focusWindow = (windowKey) => {
//             const win = draft.windows[windowKey];
//             win.zIndex = draft.nextZIndex++; // Update the Z index
//         };
//     })
// );

 
    //export the store 1:24:34
    export default useWindowStore

