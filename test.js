require("console-pretty-print");

const { fetchOgMetaData } = require("./resolvers/metadata");

console.log("fetching data");
const res = fetchOgMetaData(
    "https://www.amazon.in/Samsung-Inverter-Refrigerator-RT28T3483S8-HL/dp/B083461G9M/ref=sr_1_3?dchild=1&pf_rd_p=9d2096f8-d1f7-4799-accb-686424bc6fa3&pf_rd_r=WF17ZBQ7TJ04FKWW94SF&qid=1606620128&refinements=p_85%3A10440599031&rps=1&s=kitchen&sr=1-3"
).then(data => console.pretty(data));