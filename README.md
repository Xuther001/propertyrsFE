# PropertyRS Setup & Usage Guide

Frontend (PropertyrsFE) Setup

1. Clone this repository: git clone https://github.com/Xuther001/propertyrsFE.git

2. Go to propertyrsFE/src/configs/AxiosConfig.js<br>
   Edit AxiosConfig like so:
<pre><code>
  import axios from 'axios';

  const axiosInstance = axios.create({
    baseURL: 'your-aws-url-here',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  export default axiosInstance;
</code></pre>

3. Finally deploy to AWS
   
