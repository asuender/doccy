export interface DocEntry {
  name: string
  path: string
  kind: "struct" | "trait" | "enum" | "fn" | "mod" | "type" | "macro"
  lib: "std" | "core"
  brief: string
  doc: string
}

// Placeholder entries - will be replaced with real rustdoc data later
export const DOC_ENTRIES: DocEntry[] = [
  {
    name: "HashMap",
    path: "std::collections::HashMap",
    kind: "struct",
    lib: "std",
    brief: "A hash map implemented with quadratic probing and SIMD lookup.",
    doc: `# HashMap

A hash map implemented with quadratic probing and SIMD lookup.

By default, \`HashMap\` uses a hashing algorithm selected to provide resistance against HashDoS attacks. The algorithm is randomly seeded, and a reasonable best-effort is made to generate this seed from a high quality, secure source of randomness provided by the host without blocking the program.

## Examples

\`\`\`rust
use std::collections::HashMap;

let mut scores = HashMap::new();

scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);

for (key, value) in &scores {
    println!("{key}: {value}");
}
\`\`\`

## Methods

### new

\`\`\`rust
pub fn new() -> HashMap<K, V, RandomState>
\`\`\`

Creates an empty \`HashMap\`.

The hash map is initially created with a capacity of 0, so it will not allocate until it is first inserted into.

### insert

\`\`\`rust
pub fn insert(&mut self, k: K, v: V) -> Option<V>
\`\`\`

Inserts a key-value pair into the map. If the map did not have this key present, \`None\` is returned.

### get

\`\`\`rust
pub fn get<Q>(&self, k: &Q) -> Option<&V>
where
    K: Borrow<Q>,
    Q: Hash + Eq + ?Sized,
\`\`\`

Returns a reference to the value corresponding to the key.

### contains_key

\`\`\`rust
pub fn contains_key<Q>(&self, k: &Q) -> bool
where
    K: Borrow<Q>,
    Q: Hash + Eq + ?Sized,
\`\`\`

Returns \`true\` if the map contains a value for the specified key.

### remove

\`\`\`rust
pub fn remove<Q>(&mut self, k: &Q) -> Option<V>
where
    K: Borrow<Q>,
    Q: Hash + Eq + ?Sized,
\`\`\`

Removes a key from the map, returning the value at the key if the key was previously in the map.`,
  },
  {
    name: "Vec",
    path: "std::vec::Vec",
    kind: "struct",
    lib: "std",
    brief: "A contiguous growable array type.",
    doc: `# Vec

A contiguous growable array type, written as \`Vec<T>\`, short for 'vector'.

## Examples

\`\`\`rust
let mut vec = Vec::new();
vec.push(1);
vec.push(2);

assert_eq!(vec.len(), 2);
assert_eq!(vec[0], 1);

assert_eq!(vec.pop(), Some(2));
assert_eq!(vec.len(), 1);
\`\`\`

## Methods

### new

\`\`\`rust
pub const fn new() -> Vec<T>
\`\`\`

Constructs a new, empty \`Vec<T>\`. The vector will not allocate until elements are pushed onto it.

### push

\`\`\`rust
pub fn push(&mut self, value: T)
\`\`\`

Appends an element to the back of a collection.

### pop

\`\`\`rust
pub fn pop(&mut self) -> Option<T>
\`\`\`

Removes the last element from a vector and returns it, or \`None\` if it is empty.

### len

\`\`\`rust
pub fn len(&self) -> usize
\`\`\`

Returns the number of elements in the vector.`,
  },
  {
    name: "String",
    path: "std::string::String",
    kind: "struct",
    lib: "std",
    brief: "A UTF-8 encoded, growable string.",
    doc: `# String

A UTF-8-encoded, growable string.

\`String\` is the most common string type. It has ownership over the contents of the string, stored in a heap-allocated buffer.

## Examples

\`\`\`rust
let mut s = String::new();
s.push_str("hello");
s.push(' ');
s.push_str("world");

assert_eq!(s, "hello world");
\`\`\`

## Methods

### new

\`\`\`rust
pub const fn new() -> String
\`\`\`

Creates a new empty \`String\`.

### from

\`\`\`rust
pub fn from(s: &str) -> String
\`\`\`

Creates a new \`String\` from a string slice.

### push_str

\`\`\`rust
pub fn push_str(&mut self, string: &str)
\`\`\`

Appends a given string slice onto the end of this \`String\`.`,
  },
  {
    name: "Option",
    path: "core::option::Option",
    kind: "enum",
    lib: "core",
    brief: "The Option type represents an optional value.",
    doc: `# Option

Type \`Option\` represents an optional value: every \`Option\` is either \`Some\` and contains a value, or \`None\`, and does not.

## Variants

- \`None\` - No value.
- \`Some(T)\` - Some value of type \`T\`.

## Examples

\`\`\`rust
fn divide(numerator: f64, denominator: f64) -> Option<f64> {
    if denominator == 0.0 {
        None
    } else {
        Some(numerator / denominator)
    }
}

let result = divide(2.0, 3.0);
match result {
    Some(x) => println!("Result: {x}"),
    None    => println!("Cannot divide by 0"),
}
\`\`\`

## Methods

### unwrap

\`\`\`rust
pub fn unwrap(self) -> T
\`\`\`

Returns the contained \`Some\` value, consuming the self value. Panics if the value is a \`None\`.

### unwrap_or

\`\`\`rust
pub fn unwrap_or(self, default: T) -> T
\`\`\`

Returns the contained \`Some\` value or a provided default.

### map

\`\`\`rust
pub fn map<U, F: FnOnce(T) -> U>(self, f: F) -> Option<U>
\`\`\`

Maps an \`Option<T>\` to \`Option<U>\` by applying a function to a contained value.

### is_some

\`\`\`rust
pub const fn is_some(&self) -> bool
\`\`\`

Returns \`true\` if the option is a \`Some\` value.

### is_none

\`\`\`rust
pub const fn is_none(&self) -> bool
\`\`\`

Returns \`true\` if the option is a \`None\` value.`,
  },
  {
    name: "Result",
    path: "core::result::Result",
    kind: "enum",
    lib: "core",
    brief: "A type for functions that may succeed or fail.",
    doc: `# Result

\`Result<T, E>\` is the type used for returning and propagating errors. It is an enum with the variants \`Ok(T)\`, representing success, and \`Err(E)\`, representing error.

## Variants

- \`Ok(T)\` - Contains the success value.
- \`Err(E)\` - Contains the error value.

## Examples

\`\`\`rust
use std::fs::File;

fn read_file(path: &str) -> Result<String, std::io::Error> {
    std::fs::read_to_string(path)
}

match read_file("hello.txt") {
    Ok(contents) => println!("{contents}"),
    Err(e) => println!("Error: {e}"),
}
\`\`\`

## Methods

### unwrap

\`\`\`rust
pub fn unwrap(self) -> T
\`\`\`

Returns the contained \`Ok\` value, consuming the self value. Panics if the value is an \`Err\`.

### map

\`\`\`rust
pub fn map<U, F: FnOnce(T) -> U>(self, f: F) -> Result<U, E>
\`\`\`

Maps a \`Result<T, E>\` to \`Result<U, E>\` by applying a function to the \`Ok\` value.

### is_ok

\`\`\`rust
pub const fn is_ok(&self) -> bool
\`\`\`

Returns \`true\` if the result is \`Ok\`.`,
  },
  {
    name: "Iterator",
    path: "core::iter::Iterator",
    kind: "trait",
    lib: "core",
    brief: "A trait for dealing with iterators.",
    doc: `# Iterator

A trait for dealing with iterators.

This is the main iterator trait. For more about the concept of iterators generally, please see the module-level documentation.

## Required Methods

### next

\`\`\`rust
fn next(&mut self) -> Option<Self::Item>
\`\`\`

Advances the iterator and returns the next value. Returns \`None\` when iteration is finished.

## Provided Methods

### map

\`\`\`rust
fn map<B, F>(self, f: F) -> Map<Self, F>
where
    F: FnMut(Self::Item) -> B,
\`\`\`

Takes a closure and creates an iterator which calls that closure on each element.

### filter

\`\`\`rust
fn filter<P>(self, predicate: P) -> Filter<Self, P>
where
    P: FnMut(&Self::Item) -> bool,
\`\`\`

Creates an iterator which uses a closure to determine if an element should be yielded.

### collect

\`\`\`rust
fn collect<B: FromIterator<Self::Item>>(self) -> B
\`\`\`

Transforms an iterator into a collection.

### fold

\`\`\`rust
fn fold<B, F>(self, init: B, f: F) -> B
where
    F: FnMut(B, Self::Item) -> B,
\`\`\`

Folds every element into an accumulator by applying an operation, returning the final result.

## Examples

\`\`\`rust
let v = vec![1, 2, 3];

let doubled: Vec<i32> = v.iter().map(|x| x * 2).collect();

assert_eq!(doubled, vec![2, 4, 6]);
\`\`\``,
  },
  {
    name: "Clone",
    path: "core::clone::Clone",
    kind: "trait",
    lib: "core",
    brief: "A common trait for the ability to explicitly duplicate an object.",
    doc: `# Clone

A common trait for the ability to explicitly duplicate an object.

Differs from \`Copy\` in that \`Copy\` is implicit and an inexpensive bit-wise copy, while \`Clone\` is always explicit and may or may not be expensive.

## Required Methods

### clone

\`\`\`rust
fn clone(&self) -> Self
\`\`\`

Returns a copy of the value.

## Examples

\`\`\`rust
let hello = "Hello";
let copy = hello.clone();
assert_eq!(hello, copy);
\`\`\``,
  },
  {
    name: "Display",
    path: "core::fmt::Display",
    kind: "trait",
    lib: "core",
    brief: "Format trait for an empty format, {}.",
    doc: `# Display

Format trait for an empty format, \`{}\`.

\`Display\` is similar to \`Debug\`, but \`Display\` is for user-facing output.

## Required Methods

### fmt

\`\`\`rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>
\`\`\`

Formats the value using the given formatter.

## Examples

\`\`\`rust
use std::fmt;

struct Point {
    x: i32,
    y: i32,
}

impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}

let origin = Point { x: 0, y: 0 };
println!("The origin is: {origin}");
\`\`\``,
  },
  {
    name: "Box",
    path: "std::boxed::Box",
    kind: "struct",
    lib: "std",
    brief: "A pointer type for heap allocation.",
    doc: `# Box

A pointer type for heap allocation.

\`Box<T>\` provides the simplest form of heap allocation in Rust. Boxes provide ownership for this allocation and drop their contents when they go out of scope.

## Examples

\`\`\`rust
let val: u8 = 5;
let boxed: Box<u8> = Box::new(val);
\`\`\`

## Methods

### new

\`\`\`rust
pub fn new(x: T) -> Box<T>
\`\`\`

Allocates memory on the heap and then places \`x\` into it.`,
  },
  {
    name: "Arc",
    path: "std::sync::Arc",
    kind: "struct",
    lib: "std",
    brief: "A thread-safe reference-counting pointer.",
    doc: `# Arc

A thread-safe reference-counting pointer. \`Arc\` stands for 'Atomically Reference Counted'.

The type \`Arc<T>\` provides shared ownership of a value of type \`T\`, allocated on the heap. Invoking \`clone\` on \`Arc\` produces a new \`Arc\` instance which points to the same allocation.

## Examples

\`\`\`rust
use std::sync::Arc;
use std::thread;

let val = Arc::new(5);

for _ in 0..10 {
    let val = Arc::clone(&val);
    thread::spawn(move || {
        println!("{val}");
    });
}
\`\`\`

## Methods

### new

\`\`\`rust
pub fn new(data: T) -> Arc<T>
\`\`\`

Constructs a new \`Arc<T>\`.

### clone

\`\`\`rust
pub fn clone(&self) -> Arc<T>
\`\`\`

Makes a clone of the \`Arc\` pointer. This creates another pointer to the same allocation, increasing the strong reference count.`,
  },
  {
    name: "Mutex",
    path: "std::sync::Mutex",
    kind: "struct",
    lib: "std",
    brief: "A mutual exclusion primitive for protecting shared data.",
    doc: `# Mutex

A mutual exclusion primitive useful for protecting shared data.

This mutex will block threads waiting for the lock to become available. The mutex can be created via a \`new\` constructor. Each mutex has a type parameter which represents the data that it is protecting.

## Examples

\`\`\`rust
use std::sync::Mutex;

let m = Mutex::new(5);

{
    let mut num = m.lock().unwrap();
    *num = 6;
}

println!("m = {:?}", m);
\`\`\`

## Methods

### new

\`\`\`rust
pub fn new(t: T) -> Mutex<T>
\`\`\`

Creates a new mutex in an unlocked state ready for use.

### lock

\`\`\`rust
pub fn lock(&self) -> LockResult<MutexGuard<'_, T>>
\`\`\`

Acquires a mutex, blocking the current thread until it is able to do so.`,
  },
  {
    name: "HashSet",
    path: "std::collections::HashSet",
    kind: "struct",
    lib: "std",
    brief: "A hash set implemented as a HashMap where the value is ().",
    doc: `# HashSet

A hash set implemented as a \`HashMap\` where the value is \`()\`.

A \`HashSet\` stores unique values with no duplicates allowed.

## Examples

\`\`\`rust
use std::collections::HashSet;

let mut books = HashSet::new();
books.insert("A Great Book");
books.insert("Another Book");

if !books.contains("A Third Book") {
    println!("We don't have that book yet.");
}

books.remove("A Great Book");
\`\`\`

## Methods

### new

\`\`\`rust
pub fn new() -> HashSet<T, RandomState>
\`\`\`

Creates an empty \`HashSet\`.

### insert

\`\`\`rust
pub fn insert(&mut self, value: T) -> bool
\`\`\`

Adds a value to the set. Returns whether the value was newly inserted.

### contains

\`\`\`rust
pub fn contains<Q>(&self, value: &Q) -> bool
\`\`\`

Returns \`true\` if the set contains a value.`,
  },
]

const KIND_LABELS: Record<DocEntry["kind"], string> = {
  struct: "struct",
  trait: "trait",
  enum: "enum",
  fn: "fn",
  mod: "mod",
  type: "type",
  macro: "macro",
}

export function kindLabel(kind: DocEntry["kind"]): string {
  return KIND_LABELS[kind]
}
