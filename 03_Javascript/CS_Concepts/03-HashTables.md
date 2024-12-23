### Intro
A hash table is a combination of an array and embedded linked lists. When creating hash functions, multiplying by a prime number 
will reduce the likelihood of hash codes being evenly divisible by the bucket length, which helps minimize the occurrence of 
collisions. With a good hash function: no matter the input, the output is evenly distributed. To deal with this, our hash map 
class needs to keep track of two fields, the `capacity` and the `load factor`.
- The *capacity* is the total number of buckets we currently have.
- The *load factor* is a number that we assign our hash map to at the start. It’s the factor that will determine when it is a 
good time to grow our buckets. Hash map implementations across various languages use a load factor between 0.75 and 1.

The product of these two numbers gives us a number, and we know it’s time to grow when there are more entries in the hash map 
than that number. For example, if there are 16 buckets, and the load factor is 0.8, then we need to grow the buckets when there 
are more than 16 * 0.8 = 12.8 entries - which happens on the 13th entry. Setting it too low will consume too much memory by 
having too many empty buckets, while setting it too high will allow our buckets to have many collisions before we grow them. <br>

An example hash function is
```JS
function stringToNumber(string) {
  let hashCode = 0;

  const primeNumber = 31;
  for (let i = 0; i < string.length; i++) {
    hashCode = primeNumber * hashCode + string.charCodeAt(i);
  }

  return hashCode;
}
```

For very long keys, our hash code will exceed the maximum integer value allowed by JavaScript. Once that happens, calculations 
become inaccurate, and the chance of collisions significantly increases. One way to avoid this issue is to apply the modulo `%` 
operator on each iteration instead of outside the loop at the end. This ensures the output never becomes larger than our 
bucket’s length.

### Rules for choosing good hash function:
1. The hash function should be simple to compute.
2. Number of collisions should be less while placing the record in the hash table.Ideally no collision should occur. Such a function is called perfect hash function.
3. Hash function should produce such keys which will get distributed uniformly over an array.
4. The hash function should depend on every bit of the key. Thus the hash function that simply extracts the portion of a key is not suitable.