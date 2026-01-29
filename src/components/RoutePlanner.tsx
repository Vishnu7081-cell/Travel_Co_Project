import { useState } from "react";
import {
  Shield,
  Accessibility,
  Hospital,
  Pill,
  Users,
} from "lucide-react";
import { tripsAPI } from "../utils/api";

interface RoutePlannerProps {
  onTripCreated: (trip: any) => void;
}

export function RoutePlanner({
  onTripCreated,
}: RoutePlannerProps) {
  const [startState, setStartState] = useState("");
  const [destinationDistrict, setDestinationDistrict] =
    useState("");
  const [travelDate, setTravelDate] = useState("");

  const [maxDailyHours, setMaxDailyHours] = useState(4);
  const [restStops, setRestStops] = useState(2);
  const [numberOfTravelers, setNumberOfTravelers] = useState(2);

  const [showRoute, setShowRoute] = useState(false);
  const [savedTripId, setSavedTripId] = useState<string | null>(
    null,
  ); // ⭐ STORE TRIP ID

  const [needWheelchair, setNeedWheelchair] = useState(false);
  const [needHospitals, setNeedHospitals] = useState(true);
  const [needPharmacy, setNeedPharmacy] = useState(true);

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pratesh",
    "jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tirupura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const districts = [
    "Andhra Pradesh (State)",
    "Alluri Sitharama Raju",
    "Anakapalli",
    "Anantapur",
    "Annamayya",
    "Bapatla",
    "Chittoor",
    "Dr. B.R. Ambedkar Konaseema",
    "East Godavari",
    "Eluru",
    "Guntur",
    "Kakinada",
    "Krishna",
    "Kurnool",
    "Nandyal",
    "Nellore",
    "NTR",
    "Palnadu",
    "Parvathipuram Manyam",
    "Prakasam",
    "Srikakulam",
    "Sri Sathya Sai",
    "Tirupati",
    "Visakhapatnam",
    "Vizianagaram",
    "West Godavari",
    "YSR Kadapa",
    "=================================================",

    "Arunachal Pradesh (State)",
    "Anjaw",
    "Changlang",
    "Dibang Valley",
    "East Kameng",
    "East Siang",
    "Kamle",
    "Kra Daadi",
    "Kurung Kumey",
    "Leparada",
    "Lohit",
    "Longding",
    "Lower Dibang Valley",
    "Lower Siang",
    "Lower Subansiri",
    "Namsai",
    "Pakke Kessang",
    "Papum Pare",
    "Shi Yomi",
    "Siang",
    "Tawang",
    "Tirap",
    "Upper Siang",
    "Upper Subansiri",
    "West Kameng",
    "West Siang",
    "=================================================",

    "Assam (State)",
    "Bajali",
    "Baksa",
    "Barpeta",
    "Biswanath",
    "Bongaigaon",
    "Cachar",
    "Charaideo",
    "Chirang",
    "Darrang",
    "Dhemaji",
    "Dhubri",
    "Dibrugarh",
    "Dima Hasao",
    "Goalpara",
    "Golaghat",
    "Hailakandi",
    "Hojai",
    "Jorhat",
    "Kamrup",
    "Kamrup Metropolitan",
    "Karbi Anglong",
    "Karimganj",
    "Kokrajhar",
    "Lakhimpur",
    "Majuli",
    "Morigaon",
    "Nagaon",
    "Nalbari",
    "Sivasagar",
    "Sonitpur",
    "South Salmara-Mankachar",
    "Tamulpur",
    "Tinsukia",
    "Udalguri",
    "West Karbi Anglong",
    "=================================================",

    "Bihar (State)",
    "Araria",
    "Arwal",
    "Aurangabad",
    "Banka",
    "Begusarai",
    "Bhagalpur",
    "Bhojpur",
    "Buxar",
    "Darbhanga",
    "East Champaran",
    "Gaya",
    "Gopalganj",
    "Jamui",
    "Jehanabad",
    "Kaimur",
    "Katihar",
    "Khagaria",
    "Kishanganj",
    "Lakhisarai",
    "Madhepura",
    "Madhubani",
    "Munger",
    "Muzaffarpur",
    "Nalanda",
    "Nawada",
    "Patna",
    "Purnia",
    "Rohtas",
    "Saharsa",
    "Samastipur",
    "Saran",
    "Sheikhpura",
    "Sheohar",
    "Sitamarhi",
    "Siwan",
    "Supaul",
    "Vaishali",
    "West Champaran",
    "=================================================",

    "Chhattisgarh (State)",
    "Balod",
    "Baloda Bazar",
    "Balrampur",
    "Bastar",
    "Bemetara",
    "Bijapur",
    "Bilaspur",
    "Dantewada",
    "Dhamtari",
    "Durg",
    "Gariaband",
    "Gaurela-Pendra-Marwahi",
    "Janjgir-Champa",
    "Jashpur",
    "Kabirdham",
    "Kanker",
    "Khairagarh-Chhuikhadan-Gandai",
    "Kondagaon",
    "Korba",
    "Koriya",
    "Mahasamund",
    "Manendragarh-Chirmiri-Bharatpur",
    "Mohla-Manpur-Ambagarh Chowki",
    "Mungeli",
    "Narayanpur",
    "Raigarh",
    "Raipur",
    "Rajnandgaon",
    "Sakti",
    "Sarangarh-Bilaigarh",
    "Sukma",
    "Surajpur",
    "Surguja",
    "=================================================",

    "Goa (State)",
    "North Goa",
    "South Goa",
    "=================================================",

    "Gujarat (State)",
    "Ahmedabad",
    "Amreli",
    "Anand",
    "Aravalli",
    "Banaskantha",
    "Bharuch",
    "Bhavnagar",
    "Botad",
    "Chhota Udaipur",
    "Dahod",
    "Dang",
    "Devbhumi Dwarka",
    "Gandhinagar",
    "Gir Somnath",
    "Jamnagar",
    "Junagadh",
    "Kheda",
    "Kutch",
    "Mahisagar",
    "Mehsana",
    "Morbi",
    "Narmada",
    "Navsari",
    "Panchmahal",
    "Patan",
    "Porbandar",
    "Rajkot",
    "Sabarkantha",
    "Surat",
    "Surendranagar",
    "Tapi",
    "Vadodara",
    "Valsad",
    "=================================================",

    "Haryana (State)",
    "Ambala",
    "Bhiwani",
    "Charkhi Dadri",
    "Faridabad",
    "Fatehabad",
    "Gurugram",
    "Hisar",
    "Jhajjar",
    "Jind",
    "Kaithal",
    "Karnal",
    "Kurukshetra",
    "Mahendragarh",
    "Nuh",
    "Palwal",
    "Panchkula",
    "Panipat",
    "Rewari",
    "Rohtak",
    "Sirsa",
    "Sonipat",
    "Yamunanagar",
    "=================================================",

    "Himachal Pradesh (State)",
    "Bilaspur",
    "Chamba",
    "Hamirpur",
    "Kangra",
    "Kinnaur",
    "Kullu",
    "Lahaul and Spiti",
    "Mandi",
    "Shimla",
    "Sirmaur",
    "Solan",
    "Una",
    "=================================================",

    "Jharkhand (State)",
    "Bokaro",
    "Chatra",
    "Deoghar",
    "Dhanbad",
    "Dumka",
    "East Singhbhum",
    "Garhwa",
    "Giridih",
    "Godda",
    "Gumla",
    "Hazaribagh",
    "Jamtara",
    "Khunti",
    "Koderma",
    "Latehar",
    "Lohardaga",
    "Pakur",
    "Palamu",
    "Ramgarh",
    "Ranchi",
    "Sahebganj",
    "Saraikela-Kharsawan",
    "Simdega",
    "West Singhbhum",
    "=================================================",
    "Karnataka (State)",
    "Bagalkot",
    "Ballari",
    "Belagavi",
    "Bengaluru Rural",
    "Bengaluru Urban",
    "Bidar",
    "Chamarajanagar",
    "Chikkaballapur",
    "Chikkamagaluru",
    "Chitradurga",
    "Dakshina Kannada",
    "Davanagere",
    "Dharwad",
    "Gadag",
    "Hassan",
    "Haveri",
    "Kalaburagi",
    "Kodagu",
    "Kolar",
    "Koppal",
    "Mandya",
    "Mysuru",
    "Raichur",
    "Ramanagara",
    "Shivamogga",
    "Tumakuru",
    "Udupi",
    "Uttara Kannada",
    "Vijayapura",
    "Yadgir",
    "=================================================",
    "Kerala (State)",
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad",
    "=================================================",
    "Madhya Pradesh (State)",
    "Agar Malwa",
    "Alirajpur",
    "Anuppur",
    "Ashoknagar",
    "Balaghat",
    "Barwani",
    "Betul",
    "Bhind",
    "Bhopal",
    "Burhanpur",
    "Chhatarpur",
    "Chhindwara",
    "Damoh",
    "Datia",
    "Dewas",
    "Dhar",
    "Dindori",
    "Guna",
    "Gwalior",
    "Harda",
    "Indore",
    "Jabalpur",
    "Jhabua",
    "Katni",
    "Khandwa",
    "Khargone",
    "Mandla",
    "Mandsaur",
    "Morena",
    "Narmadapuram",
    "Narsinghpur",
    "Neemuch",
    "Niwari",
    "Panna",
    "Raisen",
    "Rajgarh",
    "Ratlam",
    "Rewa",
    "Sagar",
    "Satna",
    "Sehore",
    "Seoni",
    "Shahdol",
    "Shajapur",
    "Sheopur",
    "Shivpuri",
    "Sidhi",
    "Singrauli",
    "Tikamgarh",
    "Ujjain",
    "Umaria",
    "Vidisha",
    "=================================================",
    "Maharashtra (State)",
    "Ahmednagar",
    "Akola",
    "Amravati",
    "Aurangabad",
    "Beed",
    "Bhandara",
    "Buldhana",
    "Chandrapur",
    "Dhule",
    "Gadchiroli",
    "Gondia",
    "Hingoli",
    "Jalgaon",
    "Jalna",
    "Kolhapur",
    "Latur",
    "Mumbai City",
    "Mumbai Suburban",
    "Nagpur",
    "Nanded",
    "Nandurbar",
    "Nashik",
    "Osmanabad",
    "Palghar",
    "Parbhani",
    "Pune",
    "Raigad",
    "Ratnagiri",
    "Sangli",
    "Satara",
    "Sindhudurg",
    "Solapur",
    "Thane",
    "Wardha",
    "Washim",
    "Yavatmal",
    "=================================================",
    "Manipur (State)",
    "Bishnupur",
    "Chandel",
    "Churachandpur",
    "Imphal East",
    "Imphal West",
    "Jiribam",
    "Kakching",
    "Kamjong",
    "Kangpokpi",
    "Noney",
    "Pherzawl",
    "Senapati",
    "Tamenglong",
    "Tengnoupal",
    "Thoubal",
    "Ukhrul",
    "=================================================",
    "Meghalaya (State)",
    "East Garo Hills",
    "East Jaintia Hills",
    "East Khasi Hills",
    "North Garo Hills",
    "Ri Bhoi",
    "South Garo Hills",
    "South West Garo Hills",
    "South West Khasi Hills",
    "West Garo Hills",
    "West Jaintia Hills",
    "West Khasi Hills",
    "=================================================",
    "Mizoram (State)",
    "Aizawl",
    "Champhai",
    "Hnahthial",
    "Khawzawl",
    "Kolasib",
    "Lawngtlai",
    "Lunglei",
    "Mamit",
    "Saiha",
    "Serchhip",
    "Saitual",
    "=================================================",
    "Nagaland (State)",
    "Chumoukedima",
    "Dimapur",
    "Kiphire",
    "Kohima",
    "Longleng",
    "Mokokchung",
    "Mon",
    "Niuland",
    "Noklak",
    "Peren",
    "Phek",
    "Shamator",
    "Tseminyu",
    "Tuensang",
    "Wokha",
    "Zunheboto",
    "=================================================",
    "Odisha (State)",
    "Angul",
    "Balangir",
    "Balasore",
    "Bargarh",
    "Bhadrak",
    "Boudh",
    "Cuttack",
    "Deogarh",
    "Dhenkanal",
    "Gajapati",
    "Ganjam",
    "Jagatsinghpur",
    "Jajpur",
    "Jharsuguda",
    "Kalahandi",
    "Kandhamal",
    "Kendrapara",
    "Kendujhar",
    "Khordha",
    "Koraput",
    "Malkangiri",
    "Mayurbhanj",
    "Nabarangpur",
    "Nayagarh",
    "Nuapada",
    "Puri",
    "Rayagada",
    "Sambalpur",
    "Subarnapur",
    "Sundargarh",
    "=================================================",
    "Punjab (State)",
    "Amritsar",
    "Barnala",
    "Bathinda",
    "Faridkot",
    "Fatehgarh Sahib",
    "Fazilka",
    "Ferozepur",
    "Gurdaspur",
    "Hoshiarpur",
    "Jalandhar",
    "Kapurthala",
    "Ludhiana",
    "Malerkotla",
    "Mansa",
    "Moga",
    "Mohali",
    "Muktsar",
    "Nawanshahr",
    "Pathankot",
    "Patiala",
    "Rupnagar",
    "Sangrur",
    "Tarn Taran",
    "=================================================",
    "Rajasthan (State)",
    "Ajmer",
    "Alwar",
    "Banswara",
    "Baran",
    "Barmer",
    "Bharatpur",
    "Bhilwara",
    "Bikaner",
    "Bundi",
    "Chittorgarh",
    "Churu",
    "Dausa",
    "Dholpur",
    "Dungarpur",
    "Hanumangarh",
    "Jaipur",
    "Jaisalmer",
    "Jalore",
    "Jhalawar",
    "Jhunjhunu",
    "Jodhpur",
    "Karauli",
    "Kota",
    "Nagaur",
    "Pali",
    "Pratapgarh",
    "Rajsamand",
    "Sawai Madhopur",
    "Sikar",
    "Sirohi",
    "Sri Ganganagar",
    "Tonk",
    "Udaipur",
    "=================================================",
    "Sikkim (State)",
    "East Sikkim",
    "North Sikkim",
    "Pakyong",
    "Soreng",
    "South Sikkim",
    "West Sikkim",
    "=================================================",
    "Tamil Nadu (State)",
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kanchipuram",
    "Kanyakumari",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Mayiladuthurai",
    "Nagapattinam",
    "Namakkal",
    "Nilgiris",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivaganga",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thiruvallur",
    "Thiruvarur",
    "Thoothukudi",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupathur",
    "Tiruppur",
    "Tiruvannamalai",
    "Vellore",
    "Viluppuram",
    "Virudhunagar",
    "=================================================",
    "Telangana (State)",
    "Adilabad",
    "Bhadradri Kothagudem",
    "Hanamkonda",
    "Hyderabad",
    "Jagtial",
    "Jangaon",
    "Jayashankar Bhupalpally",
    "Jogulamba Gadwal",
    "Kamareddy",
    "Karimnagar",
    "Khammam",
    "Komaram Bheem",
    "Mahabubabad",
    "Mahabubnagar",
    "Mancherial",
    "Medak",
    "Medchal–Malkajgiri",
    "Mulugu",
    "Nagarkurnool",
    "Nalgonda",
    "Narayanpet",
    "Nirmal",
    "Nizamabad",
    "Peddapalli",
    "Rajanna Sircilla",
    "Rangareddy",
    "Sangareddy",
    "Siddipet",
    "Suryapet",
    "Vikarabad",
    "Wanaparthy",
    "Warangal",
    "Yadadri Bhuvanagiri",
    "=================================================",
    "Tripura (State)",
    "Dhalai",
    "Gomati",
    "Khowai",
    "North Tripura",
    "Sepahijala",
    "South Tripura",
    "Unakoti",
    "West Tripura",
    "=================================================",
    "Uttar Pradesh (State)",
    "Agra",
    "Aligarh",
    "Ambedkar Nagar",
    "Amethi",
    "Amroha",
    "Auraiya",
    "Ayodhya",
    "Azamgarh",
    "Baghpat",
    "Bahraich",
    "Ballia",
    "Balrampur",
    "Banda",
    "Barabanki",
    "Bareilly",
    "Basti",
    "Bhadohi",
    "Bijnor",
    "Budaun",
    "Bulandshahr",
    "Chandauli",
    "Chitrakoot",
    "Deoria",
    "Etah",
    "Etawah",
    "Farrukhabad",
    "Fatehpur",
    "Firozabad",
    "Gautam Buddha Nagar",
    "Ghaziabad",
    "Ghazipur",
    "Gonda",
    "Gorakhpur",
    "Hamirpur",
    "Hapur",
    "Hardoi",
    "Hathras",
    "Jalaun",
    "Jaunpur",
    "Jhansi",
    "Kannauj",
    "Kanpur Dehat",
    "Kanpur Nagar",
    "Kasganj",
    "Kaushambi",
    "Kheri",
    "Kushinagar",
    "Lalitpur",
    "Lucknow",
    "Maharajganj",
    "Mahoba",
    "Mainpuri",
    "Mathura",
    "Mau",
    "Meerut",
    "Mirzapur",
    "Moradabad",
    "Muzaffarnagar",
    "Pilibhit",
    "Pratapgarh",
    "Prayagraj",
    "Raebareli",
    "Rampur",
    "Saharanpur",
    "Sambhal",
    "Shahjahanpur",
    "Shamli",
    "Shravasti",
    "Siddharthnagar",
    "Sitapur",
    "Sonbhadra",
    "Sultanpur",
    "Unnao",
    "Varanasi",
    "=================================================",
    "Uttarakhand (State)",
    "Almora",
    "Bageshwar",
    "Chamoli",
    "Champawat",
    "Dehradun",
    "Haridwar",
    "Nainital",
    "Pauri Garhwal",
    "Pithoragarh",
    "Rudraprayag",
    "Tehri Garhwal",
    "Udham Singh Nagar",
    "Uttarkashi",
    "=================================================",
    "West Bengal (State)",
    "Alipurduar",
    "Bankura",
    "Birbhum",
    "Cooch Behar",
    "Dakshin Dinajpur",
    "Darjeeling",
    "Hooghly",
    "Howrah",
    "Jalpaiguri",
    "Jhargram",
    "Kalimpong",
    "Kolkata",
    "Malda",
    "Murshidabad",
    "Nadia",
    "North 24 Parganas",
    "Paschim Bardhaman",
    "Paschim Medinipur",
    "Purba Bardhaman",
    "Purba Medinipur",
    "Purulia",
    "South 24 Parganas",
    "Uttar Dinajpur",
    "=================================================",
    "Andaman and Nicobar Islands (UT)",
    "Nicobar",
    "North and Middle Andaman",
    "South Andaman",
    "=================================================",
    "Chandigarh (UT)",
    "Chandigarh",
    "=================================================",
    "Dadra and Nagar Haveli and Daman and Diu (UT)",
    "Dadra and Nagar Haveli",
    "Daman",
    "Diu",
    "=================================================",
    "Delhi (UT)",
    "Central Delhi",
    "East Delhi",
    "New Delhi",
    "North Delhi",
    "North East Delhi",
    "North West Delhi",
    "Shahdara",
    "South Delhi",
    "South East Delhi",
    "South West Delhi",
    "West Delhi",
    "=================================================",
    "Jammu and Kashmir (UT)",
    "Anantnag",
    "Bandipora",
    "Baramulla",
    "Budgam",
    "Doda",
    "Ganderbal",
    "Jammu",
    "Kathua",
    "Kishtwar",
    "Kulgam",
    "Kupwara",
    "Poonch",
    "Pulwama",
    "Rajouri",
    "Ramban",
    "Reasi",
    "Samba",
    "Shopian",
    "Srinagar",
    "Udhampur",
    "=================================================",
    "Ladakh (UT)",
    "Kargil",
    "Leh",
    "=================================================",
    "Lakshadweep (UT)",
    "Lakshadweep",
    "=================================================",
    "Puducherry (UT)",
    "Karaikal",
    "Mahe",
    "Puducherry",
    "Yanam",
  ];

  // ✅ SAVE TRIP AND RETURN ID
  const saveTripToDatabase = async () => {
    const storedUser = JSON.parse(
      localStorage.getItem("customer") || "{}",
    );

    if (!storedUser?.id) {
      alert("User not logged in");
      return false;
    }

    try {
      const response = await tripsAPI.create({
        customerId: storedUser.id,
        tripName: `${startState} to ${destinationDistrict}`,
        startState: startState,
        destinationDistrict: destinationDistrict,
        startDate: travelDate,
        endDate: travelDate, // Added to fix validation error
        maxDailyHours: maxDailyHours,
        restFrequency: restStops,
        numberOfTravelers: numberOfTravelers,
        wheelchairAccessible: needWheelchair,
        nearbyHospitals: needHospitals,
        nearbyPharmacies: needPharmacy,
        paymentStatus: "Pending",
      });

      if (response.success && response.data) {
        setSavedTripId(response.data._id); // ⭐ SAVE TRIP ID
        return true;
      } else {
        alert("Error saving trip");
        return false;
      }
    } catch (error: any) {
      alert("Error saving trip: " + error.message);
      return false;
    }
  };

  const generateRoute = async () => {
    if (!travelDate) {
      alert("Please select a travel date");
      return;
    }

    const saved = await saveTripToDatabase();
    if (!saved) return;

    setShowRoute(true);
  };

  // ✅ SEND TRIP ID TO BOOKING FLOW
  const proceedToBooking = () => {
    if (!savedTripId) {
      alert("Trip not saved properly");
      return;
    }

    onTripCreated({
      trip_id: savedTripId, // ⭐ MOST IMPORTANT
      startState,
      destinationDistrict,
      travelDate,
      maxDailyHours,
      restStops,
      numberOfTravelers,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* LEFT SIDE FORM */}
      <div className="bg-white rounded-xl p-8 shadow-md border space-y-6">
        <h2 className="text-gray-900">Plan Your Safe Journey</h2>

        <div>
          <label className="block mb-2">Starting State</label>
          <select
            value={startState}
            onChange={(e) => setStartState(e.target.value)}
            className="w-full p-4 border rounded-lg"
          >
            <option value="">Select starting state</option>
            {states.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">Destination City/District</label>
          <select
            value={destinationDistrict}
            onChange={(e) => setDestinationDistrict(e.target.value)}
            className="w-full p-4 border rounded-lg"
          >
            <option value="">Select destination</option>
            {districts.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">Travel Date</label>
          <input
            type="date"
            value={travelDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setTravelDate(e.target.value)}
            className="w-full p-4 border rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-2">Number of Travelers</label>
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border">
            <Users className="w-5 h-5 text-indigo-600" />
            <input
              type="number"
              min="1"
              max="10"
              value={numberOfTravelers}
              onChange={(e) => setNumberOfTravelers(Number(e.target.value))}
              className="flex-1 bg-transparent border-none focus:ring-0 text-lg"
            />
            <span className="text-gray-500">People</span>
          </div>
        </div>

        <div className="bg-indigo-50 p-6 rounded-lg space-y-4">
          <h4 className="flex items-center gap-2 text-indigo-900">
            <Shield className="w-5 h-5" /> Geriatric Safety Rules
          </h4>

          <div>
            Max Daily Travel Hours: {maxDailyHours}
            <input
              type="range"
              min="2"
              max="6"
              value={maxDailyHours}
              onChange={(e) => setMaxDailyHours(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            Mandatory Rest Stops: Every {restStops} hrs
            <input
              type="range"
              min="1"
              max="5"
              value={restStops}
              onChange={(e) => setRestStops(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={needWheelchair}
              onChange={(e) => setNeedWheelchair(e.target.checked)}
            />
            <Accessibility className="w-5 h-5 text-indigo-600" /> Wheelchair
            accessible stays
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={needHospitals}
              onChange={(e) => setNeedHospitals(e.target.checked)}
            />
            <Hospital className="w-5 h-5 text-red-600" /> Show nearby hospitals
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={needPharmacy}
              onChange={(e) => setNeedPharmacy(e.target.checked)}
            />
            <Pill className="w-5 h-5 text-green-600" /> Show pharmacies
          </label>
        </div>

        <button
          onClick={generateRoute}
          disabled={!startState || !destinationDistrict || !travelDate}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl"
        >
          Generate Safe Route
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-white rounded-xl p-8 shadow-md border flex flex-col items-center justify-center">
        {showRoute ? (
          <>
            <p className="text-green-600 font-semibold mb-4">
              Route generated & trip saved successfully!
            </p>
            <button
              onClick={proceedToBooking}
              className="bg-green-600 text-white px-6 py-3 rounded-xl"
            >
              Proceed to Book This Trip
            </button>
          </>
        ) : (
          <p className="text-gray-400">Your route preview will appear here</p>
        )}
      </div>
    </div>
  );
}