import mongoose, { Document, Schema, Model } from 'mongoose'

// Define the Report subdocument interface
interface IReport {
  changeType: 'salary' | 'status'
  previousValue: number | string
  newValue: number | string
  changedAt: Date
}

// Define the Client document interface
export interface IClient extends Document {
  name: string
  email: string
  salary: number
  phoneNumber: number
  status: 'hired' | 'fired'
  joinDate: Date
  report: IReport[]
  managerID: mongoose.Types.ObjectId
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
    default: Date.now()
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
    default: Date.now()
  },
  report: {
    type: [ReportSchema],
    default: []
  },
  managerID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

// Middleware to log changes in salary or status
ClientSchema.pre<IClient>('save', function () {
  if (this.isModified('salary')) {
    const previousSalary = this.get('salary') // Get previous salary before changes
    if (previousSalary !== this.salary) {
      this.report.push({
        changeType: 'salary',
        previousValue: previousSalary,
        newValue: this.salary,
        changedAt: new Date()
      })
    }
  }

  if (this.isModified('status')) {
    const previousStatus = this.get('status', null, { getters: false }) // Get previous status
    if (previousStatus !== this.status) {
      this.report.push({
        changeType: 'status',
        previousValue: previousStatus,
        newValue: this.status,
        changedAt: new Date()
      })
    }
  }
})

// Check if the model already exists to avoid recompilation
const Client: Model<IClient> =
  mongoose.models.Client || mongoose.model<IClient>('Client', ClientSchema)

export default Client
