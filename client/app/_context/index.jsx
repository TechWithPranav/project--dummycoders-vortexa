// // import React, { createContext, useContext, useState, useCallback } from "react";
// // import { db } from "@/lib/drizzledb/dbConfig";
// // import { Users, Records } from "@/lib/drizzledb/schema";
// // import { eq } from "drizzle-orm";

// // // Create a context
// // const StateContext = createContext();

// // // Provider component
// // export const StateContextProvider = ({ children }) => {
// //   const [users, setUsers] = useState([]);
// //   const [records, setRecords] = useState([]);
// //   const [currentUser, setCurrentUser] = useState(null);

// //   // Function to fetch all users
// //   const fetchUsers = useCallback(async () => {
// //     try {
// //       const result = await db.select().from(Users).execute();
// //       setUsers(result);
// //     } catch (error) {
// //       console.error("Error fetching users:", error);
// //     }
// //   }, []);

// //   // Function to fetch user details by email
// //   const fetchUserByEmail = useCallback(async (email) => {
// //     try {
// //       const result = await db
// //         .select()
// //         .from(Users)
// //         .where(eq(Users.createdBy, email))
// //         .execute();
// //       if (result.length > 0) {
// //         setCurrentUser(result[0]);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching user by email:", error);
// //     }
// //   }, []);

// //   // Function to create a new user
// //   const createUser = useCallback(async (userData) => {
// //     try {
// //       const newUser = await db
// //         .insert(Users)
// //         .values(userData)
// //         .returning({ id: Users.id, createdBy: Users.createdBy })
// //         .execute();
// //       setUsers((prevUsers) => [...prevUsers, newUser[0]]);
// //       return newUser[0];
// //     } catch (error) {
// //       console.error("Error creating user:", error);
// //       return null;
// //     }
// //   }, []);

// //   // Function to fetch all records for a specific user
// //   const fetchUserRecords = useCallback(async (userEmail) => {
// //     try {
// //       const result = await db
// //         .select()
// //         .from(Records)
// //         .where(eq(Records.createdBy, userEmail))
// //         .execute();
// //       setRecords(result);
// //     } catch (error) {
// //       console.error("Error fetching user records:", error);
// //     }
// //   }, []);

// //   // Function to create a new record
// //   const createRecord = useCallback(async (recordData) => {
// //     try {
// //       const newRecord = await db
// //         .insert(Records)
// //         .values(recordData)
// //         .returning({ id: Records.id })
// //         .execute();
// //       setRecords((prevRecords) => [...prevRecords, newRecord[0]]);
// //       return newRecord[0];
// //     } catch (error) {
// //       console.error("Error creating record:", error);
// //       return null;
// //     }
// //   }, []);

// //   const updateRecord = useCallback(async (recordData) => {
// //     try {
// //       const { documentID, ...dataToUpdate } = recordData;
// //       console.log(documentID, dataToUpdate);
// //       const updatedRecords = await db
// //         .update(Records)
// //         .set(dataToUpdate)
// //         .where(eq(Records.id, documentID))
// //         .returning();
// //     } catch (error) {
// //       console.error("Error updating record:", error);
// //       return null;
// //     }
// //   }, []);

// //   return (
// //     <StateContext.Provider
// //       value={{
// //         users,
// //         records,
// //         fetchUsers,
// //         fetchUserByEmail,
// //         createUser,
// //         fetchUserRecords,
// //         createRecord,
// //         currentUser,
// //         updateRecord,
// //       }}
// //     >
// //       {children}
// //     </StateContext.Provider>
// //   );
// // };

// // // Custom hook to use the context
// // export const useStateContext = () => useContext(StateContext);


// import React, { createContext, useContext, useState, useCallback } from 'react';
// import { db } from '@/lib/drizzledb/dbConfig';
// import { Users, Records } from '@/lib/drizzledb/schema';
// import { eq } from 'drizzle-orm';

// // Create a context
// const StateContext = createContext();

// // Provider component
// export const StateContextProvider = ({ children }) => {
//   const [users, setUsers] = useState([]);
//   const [records, setRecords] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);

//   // Function to fetch all users
//   const fetchUsers = useCallback(async () => {
//     try {
//       const result = await db.select().from(Users).execute();
//       setUsers(result);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   }, []);

//   // Function to fetch user details by email
//   const fetchUserByEmail = useCallback(async (email) => {
//     try {
//       const result = await db
//         .select()
//         .from(Users)
//         .where(eq(Users.createdBy, email))
//         .execute();
//       if (result.length > 0) {
//         setCurrentUser(result[0]);
//       }
//     } catch (error) {
//       console.error('Error fetching user by email:', error);
//     }
//   }, []);

//   // Function to create a new user
//   const createUser = useCallback(async (userData) => {
//     try {
//       const newUser = await db
//         .insert(Users)
//         .values(userData)
//         .returning({ id: Users.id, createdBy: Users.createdBy })
//         .execute();
//         console.log('newUser:', newUser);
//       setUsers((prevUsers) => [...prevUsers, newUser[0]]);
//       return newUser[0];
//     } catch (error) {
//       console.error('Error creating user:', error);
//       return null;
//     }
//   }, []);

//   // Function to fetch all records for a specific user
//   const fetchUserRecords = useCallback(async (userEmail) => {
//     try {
//       const result = await db
//         .select()
//         .from(Records)
//         .where(eq(Records.createdBy, userEmail))
//         .execute();
//       setRecords(result);
//     } catch (error) {
//       console.error('Error fetching user records:', error);
//     }
//   }, []);

//   const createRecord = useCallback(async (recordData) => {
//     try {
//       if (!recordData.createdBy) {
//         throw new Error('createdBy field is required');
//       }
  
//       const newRecord = await db
//         .insert(Records)
//         .values({
//           ...recordData,
//           createdBy: recordData.createdBy,  // Ensure this value is not null
//         })
//         .returning({ id: Records.id })
//         .execute();
  
//       setRecords((prevRecords) => [...prevRecords, newRecord[0]]);
//       return newRecord[0];
//     } catch (error) {
//       console.error('Error creating record:', error);
//       return null;
//     }
//   }, []);

//   // const updateRecord = useCallback(async (recordData) => {
//   //   try {
//   //     const { documentID, ...dataToUpdate } = recordData;
      
//   //     console.log("Document ID:", documentID);
//   //     console.log("Data to update:", dataToUpdate);

//   //     const updatedRecords = await db
//   //       .update(Records)
//   //       .set(dataToUpdate)
//   //       .where(eq(Records.id, documentID))
//   //       .returning();
//   //       console.log('updatedRecords:', updatedRecords);
//   //   } catch (error) {
//   //     console.error('Error updating record:', error);
//   //     return null;
//   //   }
//   // }, []);

//   const updateRecord = useCallback(async (recordData) => {
//     try {
//       const { documentID, ...dataToUpdate } = recordData;
  
//       console.log("Document ID:", documentID);
//       console.log("Data to update:", dataToUpdate);
  
//       const updatedRecords = await db
//         .update(Records)
//         .set(dataToUpdate)
//         .where(eq(Records.id, documentID))
//         .returning();
        
//       console.log('updatedRecords:', updatedRecords);
  
//       // Update the local state
//       setRecords((prevRecords) =>
//         prevRecords.map((record) =>
//           record.id === documentID ? { ...record, ...dataToUpdate } : record
//         )
//       );
  
//       return updatedRecords[0];
//     } catch (error) {
//       console.error('Error updating record:', error);
//       return null;
//     }
//   }, []);

//   return (
//     <StateContext.Provider
//       value={{
//         users,
//         records,
//         fetchUsers,
//         fetchUserByEmail,
//         createUser,
//         fetchUserRecords,
//         createRecord,
//         currentUser,
//         updateRecord,
//       }}
//     >
//       {children}
//     </StateContext.Provider>
//   );
// };

// // Custom hook to use the context
// export const useStateContext = () => useContext(StateContext);


// ***********************************************************************************************************

// import React, { createContext, useContext, useState, useCallback } from "react";
// import { db } from "@/lib/drizzledb/dbConfig";
// import { Users, Records } from "@/lib/drizzledb/schema";
// import { eq } from "drizzle-orm";

// // Create a context
// const StateContext = createContext();

// // Provider component
// export const StateContextProvider = ({ children }) => {
//   const [users, setUsers] = useState([]);
//   const [records, setRecords] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);

//   // Function to fetch all users
//   const fetchUsers = useCallback(async () => {
//     try {
//       const result = await db.select().from(Users).execute();
//       setUsers(result);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   }, []);

//   // Function to fetch user details by email
//   const fetchUserByEmail = useCallback(async (email) => {
//     try {
//       const result = await db
//         .select()
//         .from(Users)
//         .where(eq(Users.createdBy, email))
//         .execute();
//       if (result.length > 0) {
//         setCurrentUser(result[0]);
//       }
//     } catch (error) {
//       console.error("Error fetching user by email:", error);
//     }
//   }, []);

//   // Function to create a new user
//   const createUser = useCallback(async (userData) => {
//     try {
//       const newUser = await db
//         .insert(Users)
//         .values(userData)
//         .returning({ id: Users.id, createdBy: Users.createdBy })
//         .execute();
//       setUsers((prevUsers) => [...prevUsers, newUser[0]]);
//       return newUser[0];
//     } catch (error) {
//       console.error("Error creating user:", error);
//       return null;
//     }
//   }, []);

//   // Function to fetch all records for a specific user
//   const fetchUserRecords = useCallback(async (userEmail) => {
//     try {
//       const result = await db
//         .select()
//         .from(Records)
//         .where(eq(Records.createdBy, userEmail))
//         .execute();
//       setRecords(result);
//     } catch (error) {
//       console.error("Error fetching user records:", error);
//     }
//   }, []);

//   // Function to create a new record
//   const createRecord = useCallback(async (recordData) => {
//     try {
//       const newRecord = await db
//         .insert(Records)
//         .values(recordData)
//         .returning({ id: Records.id })
//         .execute();
//       setRecords((prevRecords) => [...prevRecords, newRecord[0]]);
//       return newRecord[0];
//     } catch (error) {
//       console.error("Error creating record:", error);
//       return null;
//     }
//   }, []);

//   const updateRecord = useCallback(async (recordData) => {
//     try {
//       const { documentID, ...dataToUpdate } = recordData;
//       console.log(documentID, dataToUpdate);
//       const updatedRecords = await db
//         .update(Records)
//         .set(dataToUpdate)
//         .where(eq(Records.id, documentID))
//         .returning();
//     } catch (error) {
//       console.error("Error updating record:", error);
//       return null;
//     }
//   }, []);

//   return (
//     <StateContext.Provider
//       value={{
//         users,
//         records,
//         fetchUsers,
//         fetchUserByEmail,
//         createUser,
//         fetchUserRecords,
//         createRecord,
//         currentUser,
//         updateRecord,
//       }}
//     >
//       {children}
//     </StateContext.Provider>
//   );
// };

// // Custom hook to use the context
// export const useStateContext = () => useContext(StateContext);



























// import React, { createContext, useContext, useState, useCallback } from "react";
// import { db } from "@/lib/drizzledb/dbConfig";
// import { Users, Records } from "@/lib/drizzledb/schema";
// import { eq } from "drizzle-orm";

// // Create a context
// const StateContext = createContext();

// // Provider component
// export const StateContextProvider = ({ children }) => {
//   const [users, setUsers] = useState([]);
//   const [records, setRecords] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);

//   // Function to fetch all users
//   const fetchUsers = useCallback(async () => {
//     try {
//       const result = await db.select().from(Users).execute();
//       setUsers(result);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   }, []);

//   // Function to fetch user details by email
//   const fetchUserByEmail = useCallback(async (email) => {
//     try {
//       const result = await db
//         .select()
//         .from(Users)
//         .where(eq(Users.createdBy, email))
//         .execute();
//       if (result.length > 0) {
//         setCurrentUser(result[0]);
//       }
//     } catch (error) {
//       console.error("Error fetching user by email:", error);
//     }
//   }, []);

//   // Function to create a new user
//   const createUser = useCallback(async (userData) => {
//     try {
//       const newUser = await db
//         .insert(Users)
//         .values(userData)
//         .returning({ id: Users.id, createdBy: Users.createdBy })
//         .execute();
//       setUsers((prevUsers) => [...prevUsers, newUser[0]]);
//       return newUser[0];
//     } catch (error) {
//       console.error("Error creating user:", error);
//       return null;
//     }
//   }, []);

//   // Function to fetch all records for a specific user
//   const fetchUserRecords = useCallback(async (userEmail) => {
//     try {
//       const result = await db
//         .select()
//         .from(Records)
//         .where(eq(Records.createdBy, userEmail))
//         .execute();
//       setRecords(result);
//     } catch (error) {
//       console.error("Error fetching user records:", error);
//     }
//   }, []);

//   // Function to create a new record
//   const createRecord = useCallback(async (recordData) => {
//     try {
//       const newRecord = await db
//         .insert(Records)
//         .values(recordData)
//         .returning({ id: Records.id })
//         .execute();
//       setRecords((prevRecords) => [...prevRecords, newRecord[0]]);
//       return newRecord[0];
//     } catch (error) {
//       console.error("Error creating record:", error);
//       return null;
//     }
//   }, []);

//   const updateRecord = useCallback(async (recordData) => {
//     try {
//       const { documentID, ...dataToUpdate } = recordData;
//       console.log(documentID, dataToUpdate);
//       const updatedRecords = await db
//         .update(Records)
//         .set(dataToUpdate)
//         .where(eq(Records.id, documentID))
//         .returning();
//     } catch (error) {
//       console.error("Error updating record:", error);
//       return null;
//     }
//   }, []);

//   const fetchChatHistory = useCallback(async (userId) => {
//     try {
//       const result = await db
//         .select()
//         .from(ChatHistory)
//         .where(eq(ChatHistory.userId, userId))
//         .execute();
//       return result.map(entry => ({
//         type: entry.sender,
//         message: entry.message,
//       }));
//     } catch (error) {
//       console.error("Error fetching chat history:", error);
//       return [];
//     }
//   }, []);

//   // Function to save chat messages
//   const saveChatMessage = useCallback(async (userId, sender, message) => {
//     try {
//       await db
//         .insert()
//         .into(ChatHistory)
//         .values({ userId, sender, message })
//         .execute();
//     } catch (error) {
//       console.error("Error saving chat message:", error);
//     }
//   }, []);

//   return (
//     <StateContext.Provider
//       value={{
//         users,
//         records,
//         fetchUsers,
//         fetchUserByEmail,
//         createUser,
//         fetchUserRecords,
//         createRecord,
//         currentUser,
//         updateRecord,
//         fetchChatHistory,
//         saveChatMessage,
//       }}
//     >
//       {children}
//     </StateContext.Provider>
//   );
// };

// // Custom hook to use the context
// export const useStateContext = () => useContext(StateContext);


// ***********************************************************************************************************



import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { db } from "@/lib/drizzledb/dbConfig";
import { Users, Records, ChatHistory } from "@/lib/drizzledb/schema";
import { eq } from "drizzle-orm";

// Create a context
const StateContext = createContext();

// Provider component
export const StateContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Function to fetch all users
  const fetchUsers = useCallback(async () => {
    try {
      const result = await db.select().from(Users).execute();
      setUsers(result);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  // Function to fetch all records
  const fetchRecords = useCallback(async () => {
    try {
      const result = await db.select().from(Records).execute();
      setRecords(result);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  }, []);

  // Function to save a record
  const saveRecord = useCallback(
    async (record) => {
      try {
        await db.insert().into(Records).values(record).execute();
        await fetchRecords(); // Refresh the records list
      } catch (error) {
        console.error("Error saving record:", error);
      }
    },
    [fetchRecords]
  );

  // Function to set the current user
  const selectUser = useCallback((user) => {
    setCurrentUser(user);
  }, []);

  const fetchChatHistory = useCallback(async (userId) => {
    try {
      const result = await db
        .select()
        .from(ChatHistory)
        .where(eq(ChatHistory.userId, userId));
  
      console.log("Chat History:", result);
      return result.map((entry) => ({
        messageType: entry.messageType, // Ensure this matches the field names
        messageContent: entry.messageContent, // Ensure this matches the field names
      }));
  
    } catch (error) {
      console.error("Error fetching chat history:", error);
      return [];
    }
  }, []);

  const saveChatMessage = useCallback(async (userId, sender, message) => {
    try {
      // Determine message type
      const messageType = sender === 'user' ? 'user' : 'bot';
  
      // Log values to ensure correctness
      console.log("Saving message:", { userId, sender, message, messageType });
  
      // Perform the insert operation
      await db.insert(ChatHistory).values({
        userId,
        messageType, // This should match the column name in the schema
        messageContent: message, // Ensure this matches the schema name
      });
    } catch (error) {
      console.error("Error saving chat message:", error);
    }
  }, []);

    const fetchUserByEmail = useCallback(async (email) => {
    try {
      const result = await db
        .select()
        .from(Users)
        .where(eq(Users.createdBy, email))
        .execute();
      if (result.length > 0) {
        setCurrentUser(result[0]);
      }
    } catch (error) {
      console.error("Error fetching user by email:", error);
    }
  }, []);
  

    const fetchUserRecords = useCallback(async (userEmail) => {
    try {
      const result = await db
        .select()
        .from(Records)
        .where(eq(Records.createdBy, userEmail))
        .execute();
      setRecords(result);

        console.log("User Records:", result);

    } catch (error) {
      console.error("Error fetching user records:", error);
    }
  }, []);

    const createRecord = useCallback(async (recordData) => {
    try {
      const newRecord = await db
        .insert(Records)
        .values(recordData)
        .returning({ id: Records.id })
        .execute();
      setRecords((prevRecords) => [...prevRecords, newRecord[0]]);
      return newRecord[0];
    } catch (error) {
      console.error("Error creating record:", error);
      return null;
    }
  }, []);

  const updateRecord = useCallback(async (recordData) => {
    try {
      const { documentID, ...dataToUpdate } = recordData;
      console.log(documentID, dataToUpdate);
      const updatedRecords = await db
        .update(Records)
        .set(dataToUpdate)
        .where(eq(Records.id, documentID))
        .returning();
    } catch (error) {
      console.error("Error updating record:", error);
      return null;
    }
  }, []);

  // Automatically select the first user if no currentUser is set
  useEffect(() => {
    if (!currentUser && users.length > 0) {
      selectUser(users[0]); // Automatically select the first user as default
    }
  }, [currentUser, users, selectUser]);

  useEffect(() => {
    fetchUsers(); // Fetch users on mount
  }, [fetchUsers]);

  return (
    <StateContext.Provider
      value={{
        users,
        records,
        currentUser,
        fetchUsers,
        fetchRecords,
        saveRecord,
        selectUser,
        fetchChatHistory,
        saveChatMessage,
        fetchUserByEmail,
        fetchUserRecords,
        createRecord,
        updateRecord,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to use the StateContext
export const useStateContext = () => useContext(StateContext);
