import java.math.BigInteger;

// Press Shift twice to open the Search Everywhere dialog and type `show whitespaces`,
// then press Enter. You can now see whitespace characters in your code.
public class Main {
    public static void main(String[] args) {
        BigInteger n = new BigInteger("1127451830576035879");
        long startTime = System.currentTimeMillis();
        BigInteger one = FactorPrime.factor(n);
        long duration = System.currentTimeMillis() - startTime;
        int seconds = (int) (duration / 1000) % 60 ;
        int minutes = (int) ((duration / (1000*60)) % 60);
        int hours   = (int) ((duration / (1000*60*60)) % 24);
        System.out.println("Time used: " + hours + " hours "
                + minutes + " minutes " + seconds + " seconds.");
        assert(minutes<=1);
    }
}