"use client";

import { config } from "@/app/_lib/config";
import { Plan, PlanResponse } from "@/app/_lib/home";
import { useEffect, useState } from "react";

const API_URL = config.apiUrl;


export default function Home() {
  const [plans, setPosts] = useState<Plan[]>();

  useEffect(() => {
    fetch(API_URL + 'plan')
      .then(response => response.json())
      .then((data: PlanResponse) => {
        if (!data || !data.plans) {
          console.error("No posts found in the response");
          return;
        }
        if (data.plans) {
          setPosts(data.plans);
        }

        console.log(data)
      });
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      {plans && plans.map((plan) => (
        <div key={plan.id} className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">{plan.title}</h5>
          <div className="flex items-baseline text-gray-900 dark:text-white">
            <span className="text-3xl font-semibold">$</span>
            <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
          </div>
          <p className="mt-4 text-l font-medium text-gray-500 dark:text-gray-400">{plan.description}</p>
          <ul role="list" className="space-y-5 my-7">
            {plan && plan.features && plan.features.map((feature, i) => (
              <li key={i} className="flex items-center">
                <svg className="shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{feature}</span>
              </li>
            ))}
          </ul>
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Choose plan</button>
        </div>
      ))}
    </div>
  )
}
