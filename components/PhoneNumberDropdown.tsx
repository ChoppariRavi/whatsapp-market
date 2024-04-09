const PhoneNumberDropdown = ({onChange}: any) => {
  return (
    <select
      id="phoneNumbers"
      className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-4"
      onChange={(e) => onChange(e)}
    >
      <option value="">Select Phone</option>
      <option value="1234567890">123-456-7890</option>
      <option value="2345678901">234-567-8901</option>
      <option value="3456789012">345-678-9012</option>
    </select>
  );
};

export default PhoneNumberDropdown;
