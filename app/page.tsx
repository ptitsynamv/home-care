"use client";

import Modal from "@/app/_components/modal/modal";
import { config } from "@/app/_lib/config";
import { Plan, PlanResponse } from "@/app/_lib/home";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const API_URL = config.apiUrl;


export default function Home() {
  const t = useTranslations();

  const [plans, setPosts] = useState<Plan[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('My Modal');
  const modalId = 'plan-callback-modal'

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
      });
  }, []);

  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
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
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center" onClick={() => { setIsModalOpen(true); setModalTitle(plan.title) }} data-modal-target={modalId} data-modal-toggle={modalId}>Choose plan</button>
          </div>
        ))}
      </div>
      <Modal id={modalId} isOpen={isModalOpen} title={modalTitle} onClose={() => setIsModalOpen(false)}>
        <form className="p-4 md:p-5">
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t("HomePage.name")}:</label>
              <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your name" />
            </div>
            <div className="col-span-2">
              <label htmlFor="phone-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number:</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 18">
                    <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                  </svg>
                </div>
                <input type="text" id="phone-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="000-00-00-000" required />
              </div>
              <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Select a phone number that matches the format.</p>
            </div>
          </div>

          <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Call me back
          </button>
        </form>
      </Modal>
    </>
  )
}
