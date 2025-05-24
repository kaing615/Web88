const mongoConnectString = 'mongodb+srv://kainguyen615:uk4gIpLqxQb0YGSM@learn-web88.qiwtt8a.mongodb.net/lesson-5' 

import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoConnectString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); 
    }
}