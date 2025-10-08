import mongoose from 'mongoose';
import { DemoType } from '../types/models';

const Schema = mongoose.Schema;
const DemoSchema = new Schema<DemoType>({
    name: { type: String, optional: false },
});

export default mongoose.model('Demo', DemoSchema);