import { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma";
import { number, z } from "zod";
import dayjs from "dayjs";

export async function appRoutes (app:FastifyInstance){
    
  app.post("/habits", async (request) => {
      const createHabitBody =  z.object({
        title: z.string(),
        weekDays: z.array(z.number().min(0).max(6))
      });

      const {title, weekDays} = createHabitBody.parse(request.body)

      const today = dayjs().startOf("day").toDate();

      await prisma.habit.create({
        data:{
          created_at: today,
          title,
          weekDays:{
            create: weekDays.map(weekDay => {
              return{
                week_day: weekDay,
              }
            })
          }
        }
      })
      });

  app.get("/day", async (request) => {
    const getDayParams = z.object({
      date: z.coerce.date()
    })

    const { date } = getDayParams.parse(request.query)

    //todos os hábitos possíveis 
    //hábitos que já foram completados

    const possibleHabits = await prisma.habit.findMany({
      where:{
        created_at:{
          lte: date, 
        }
      }
    })
  })
}

