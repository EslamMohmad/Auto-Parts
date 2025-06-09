import { Link, useParams } from "react-router-dom";
import Order from "./Order";
import { useEffect, useState } from "react";
import { child, get, ref } from "firebase/database";
import { auth, database } from "../../Firebase/Firebase";

const AccountOrders = () => {
  const [tableData, setTableData] = useState({});
  const { order } = useParams();

  useEffect(() => {
    if (!tableData.length) {
      const myRef = child(
        ref(database),
        `Auto-Parts-Users/${auth?.currentUser?.uid}/orders`
      );
      get(myRef).then((response) => setTableData(response.val() || {}));
    }
  }, [order]);

  return (
    <section className="w-full lg:w-auto lg:grow">
      {order ? (
        <Order data={tableData[order]} />
      ) : (
        <div className="overflow-x-auto">
          {Object.keys(tableData).length ? (
            <table className="w-[1024px] lg:w-full rounded-lg bg-black/10">
              <thead>
                <tr className="[&>th]:uppercase [&>th]:text-sm [&>th]:font-semibold [&>th]:text-center [&>th]:p-4 [&>th]:text-black/60">
                  <th>order</th>
                  <th>data</th>
                  <th>status</th>
                  <th>total</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody className="p-2">
                {Object.keys(tableData).map((element) => (
                  <tr
                    className="bg-white [&>td]:text-sm [&>td]:font-semibold [&>td]:text-center [&>td]:p-4 [&>td]:text-black/60"
                    key={element}
                  >
                    <td>#{tableData[element]?.details?.order_number}</td>
                    <td>{element}</td>
                    <td>on hold</td>
                    <td>
                      {tableData[element]?.details?.subtotal} for{" "}
                      {tableData[element]?.products?.length} items
                    </td>
                    <td className="hover:text-black transition-colors !p-0">
                      <Link to={element} className="p-4">
                        view
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="bg-black/10 p-5 text-black/60">no data to show</p>
          )}
        </div>
      )}
    </section>
  );
};

export default AccountOrders;
