import payment_1 from "../Assets/Footer/payment (1).jpg";
import payment_2 from "../Assets/Footer/payment (2).jpg";
import payment_3 from "../Assets/Footer/payment (3).jpg";
import payment_4 from "../Assets/Footer/payment (4).jpg";
import payment_5 from "../Assets/Footer/payment (5).jpg";

const Payment_Imgs = () => {
  const payment = [payment_1, payment_2, payment_3, payment_4, payment_5];

  return (
    <ul className="flex gap-2 items-center">
      {payment.map((li) => (
        <li key={li}>
          <img
            src={li}
            className="w-[45px] hover:scale-110 active:scale-110 transition-transform"
          />
        </li>
      ))}
    </ul>
  );
};

export default Payment_Imgs;
