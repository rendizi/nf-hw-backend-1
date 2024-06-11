import mongoose from 'mongoose';
import { CreateEventDto } from './dtos/CreateEvent.dot';
import EventModel, { IEvent } from './models/Event';
import { Event } from './types/response';



// this event service instance shows how to create a event, get a event by id, and get all events with in-memory data
class EventService {
  
    async getEventById(id: string): Promise<IEvent | null> {
      return await EventModel.findById(id).exec();
    }

    async getEvents(location: string|null, page: number, limit: number, sortingType: string, desc: boolean): Promise<IEvent[]> {
        let sortOptions: any = {};

        if (sortingType) {
            sortOptions[sortingType] = desc ? -1 : 1;
        }

        if (location){
            if (sortingType === "rating"){
                return await EventModel.find({location:location})
                    .sort(sortOptions)
                    .limit(limit)
                    .skip((page - 1) * limit)
                    .exec();
            }else{
                return await EventModel.find({location:location})
                    .limit(limit)
                    .skip((page - 1) * limit)
                    .exec();
            }
        }else{
            if (sortingType === "rating"){
                return await EventModel.find()
                    .sort(sortOptions)
                    .limit(limit)
                    .skip((page - 1) * limit)
                    .exec();
            }else{
                return await EventModel.find()
                    .limit(limit)
                    .skip((page - 1) * limit)
                    .exec();
            }
        }
    }


    async createEvent(createEventDto: CreateEventDto): Promise<IEvent> {
      const { name, description, date, location ,duration, rating} = createEventDto;
      const newEvent = new EventModel({
        name,
        description,
        date: new Date(date),
        location,
        duration,
          rating
      });
  
      await newEvent.save();
      return newEvent;
    }
  
    
  }
  
  export default EventService;
  