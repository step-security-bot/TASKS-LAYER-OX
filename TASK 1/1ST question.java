
    import java.io.*;

    import java.util.*;
    
    class Main {
        
        public static void main (String[] args) throws IOException {
           Scanner sc=new Scanner(System.in);
           System.out.println("ENTER NO OF TEST CASES");
           int t=sc.nextInt();
            while(t!=0){
                System.out.println("ENTER THE SIZE OF ARRAY");
                int n=sc.nextInt();
                int arr[]=new int[n];
                for(int i=0;i<n;i++)
                {
                    arr[i]=sc.nextInt();
                }
                int res=maxSubarraySum(arr,n);
                System.out.println("MAX SUM IS: "+ res);
            
               t--;
            }
        }
        public static int  maxSubarraySum(int arr[], int n){
            
            
            int sum=0,maxsum=Integer.MIN_VALUE;
            for(int i=0;i<n;i++)
            {
                sum=sum+arr[i];
                maxsum=Math.max(maxsum,sum);
                if(sum<0)
                {
                    sum=0;
                }
            }
            return maxsum;
            
        }
    }
    
    
  
    
    
    
    
    
       
     
        
    
    
    