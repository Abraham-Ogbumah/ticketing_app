import React from "react";
import TicketCard from "./(components)/TicketCard";

const getTickets = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/Tickets`, {
      cache: "no-store",
    });

    return res.json();
  } catch (error) {
    console.log("Failed to get Tickets", error);
  }
};

const Dashboard = async () => {
  const { tickets } = await getTickets();

  if (!process.env.NEXT_PUBLIC_BASE_API_URL) {
    return null;
  }

  // if (!data?.tickets) {
  //   return <p>No ticteks</p>;
  // }

  // const tickets = data.tickets;

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, _index) => (
                    <TicketCard
                      id={_index}
                      key={_index}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
