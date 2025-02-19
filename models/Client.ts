import mongoose, { Document, Schema, Model } from 'mongoose'

// Define the Report subdocument interface
interface IReport {
  changeType: 'salary' | 'status'
  previousValue: number | string
  newValue: number | string
  changedAt: Date
}

// Define the Client document interface
interface IClient extends Document {
  name: string
  email: string
  salary: number
  phoneNumber: number
  status: 'hired' | 'fired'
  joinDate: Date
  report: IReport[]
  managerID: mongoose.Types.ObjectId
  previousSalary?: number // Optional property for tracking previous salary
  previousStatus?: 'hired' | 'fired' // Optional property for tracking previous status
}

// Define the schema for the report subdocument
const ReportSchema = new Schema<IReport>({
  changeType: {
    type: String,
    enum: ['salary', 'status'],
    required: true
  },
  previousValue: {
    type: Schema.Types.Mixed, // Can be a number (salary) or string (status)
    required: true
  },
  newValue: {
    type: Schema.Types.Mixed, // Can be a number (salary) or string (status)
    required: true
  },
  changedAt: {
    type: Date,
    default: Date.now
  }
})

// Define the main Client schema
const ClientSchema = new Schema<IClient>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phoneNumber: {
    type: Number,
    required: false
  },
  salary: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['hired', 'fired'],
    default: 'hired'
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  report: [ReportSchema], // Array of report objects
  managerID: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (assuming the manager is a User)
    required: true
  }
})

// Middleware to log changes in salary or status
ClientSchema.pre<IClient>('save', function (next) {
  if (this.isModified('salary')) {
    this.report.push({
      changeType: 'salary',
      previousValue: this.previousSalary || 0,
      newValue: this.salary,
      changedAt: new Date() // Add the current date and time
    })
    this.previousSalary = this.salary // Update the previousSalary property
  }
  if (this.isModified('status')) {
    this.report.push({
      changeType: 'status',
      previousValue: this.previousStatus || 'hired',
      newValue: this.status,
      changedAt: new Date() // Add the current date and time
    })
    this.previousStatus = this.status // Update the previousStatus property
  }
  next()
})

// Check if the model already exists to avoid recompilation
const Client: Model<IClient> =
  mongoose.models.Client || mongoose.model<IClient>('Client', ClientSchema)

export default Client
