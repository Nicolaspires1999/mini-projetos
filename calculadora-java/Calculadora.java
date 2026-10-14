import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

/**
 * Calculadora de linha de comando em Java.
 * Operações: soma, subtração, multiplicação, divisão, potência, resto
 * e raiz quadrada. Guarda o histórico da sessão.
 */
public class Calculadora {

    static double somar(double a, double b) { return a + b; }

    static double subtrair(double a, double b) { return a - b; }

    static double multiplicar(double a, double b) { return a * b; }

    static double dividir(double a, double b) {
        if (b == 0) throw new ArithmeticException("não é possível dividir por zero");
        return a / b;
    }

    static double potencia(double a, double b) { return Math.pow(a, b); }

    static double resto(double a, double b) {
        if (b == 0) throw new ArithmeticException("não é possível dividir por zero");
        return a % b;
    }

    static double raizQuadrada(double a) {
        if (a < 0) throw new ArithmeticException("não existe raiz quadrada real de número negativo");
        return Math.sqrt(a);
    }

    static double lerNumero(Scanner entrada, String mensagem) {
        while (true) {
            System.out.print(mensagem);
            String texto = entrada.nextLine().trim().replace(",", ".");
            try {
                return Double.parseDouble(texto);
            } catch (NumberFormatException e) {
                System.out.println("Valor inválido. Digite um número, por exemplo 12,5.");
            }
        }
    }

    static String formatar(double n) {
        if (n == Math.rint(n) && !Double.isInfinite(n)) return String.valueOf((long) n);
        return String.format("%.6f", n).replaceAll("0+$", "").replaceAll("\\.$", "");
    }

    static void mostrarMenu() {
        System.out.println("\n=== CALCULADORA ===");
        System.out.println("  +  Soma");
        System.out.println("  -  Subtração");
        System.out.println("  *  Multiplicação");
        System.out.println("  /  Divisão");
        System.out.println("  ^  Potência");
        System.out.println("  %  Resto da divisão");
        System.out.println("  r  Raiz quadrada");
        System.out.println("  h  Histórico");
        System.out.println("  s  Sair");
    }

    public static void main(String[] args) {
        Scanner entrada = new Scanner(System.in);
        List<String> historico = new ArrayList<>();

        while (true) {
            mostrarMenu();
            System.out.print("Escolha uma opção: ");
            if (!entrada.hasNextLine()) break;
            String escolha = entrada.nextLine().trim().toLowerCase();

            if (escolha.equals("s")) {
                System.out.println("Até logo!");
                break;
            }
            if (escolha.equals("h")) {
                if (historico.isEmpty()) System.out.println("Nenhum cálculo ainda.");
                for (String item : historico) System.out.println("  " + item);
                continue;
            }

            try {
                String conta;
                if (escolha.equals("r")) {
                    double a = lerNumero(entrada, "Número: ");
                    conta = "raiz(" + formatar(a) + ") = " + formatar(raizQuadrada(a));
                } else if (escolha.length() == 1 && "+-*/^%".contains(escolha)) {
                    double a = lerNumero(entrada, "Primeiro número: ");
                    double b = lerNumero(entrada, "Segundo número: ");
                    double r;
                    switch (escolha) {
                        case "+": r = somar(a, b); break;
                        case "-": r = subtrair(a, b); break;
                        case "*": r = multiplicar(a, b); break;
                        case "/": r = dividir(a, b); break;
                        case "^": r = potencia(a, b); break;
                        default:  r = resto(a, b);
                    }
                    conta = formatar(a) + " " + escolha + " " + formatar(b) + " = " + formatar(r);
                } else {
                    System.out.println("Opção inválida.");
                    continue;
                }
                System.out.println("Resultado: " + conta);
                historico.add(conta);
            } catch (ArithmeticException e) {
                System.out.println("Erro: " + e.getMessage());
            }
        }
        entrada.close();
    }
}
